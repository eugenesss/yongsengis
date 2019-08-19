from flask import flash, redirect, render_template, url_for, request, jsonify, make_response, json, g, session
from flask_login import login_required, login_user, logout_user

from . import auth
from .. import db, http_auth
from ..models import Employee
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required


@auth.route('/register', methods=['GET', 'POST'])
def register():
    """
    Handle requests to the /register route
    Add an employee to the database through the registration form
    """
    form = RegistrationForm()
    if form.validate_on_submit():
        employee = Employee(email=form.email.data,
                            username=form.username.data,
                            first_name=form.first_name.data,
                            last_name=form.last_name.data,
                            password=form.password.data)

        # add employee to the database
        db.session.add(employee)
        db.session.commit()
        flash('You have successfully registered! You may now login.')

        # redirect to the login page
        return jsonify('successfully registered'), 200

    # load registration template
    return render_template('auth/register.html', form=form, title='Register')


@auth.route('/login', methods=['GET', 'POST'])
def login():
    data = request.data
    data_js = json.loads(data)
    email = data_js.get('email')
    password = data_js.get('password')
    # check whether employee exists in the database and whether
    # the password entered matches the password in the database
    employee = Employee.query.filter_by(email=email).first()
    if employee is not None and employee.verify_password(password):
        # log employee in
        login_user(employee)
        session['logged_in'] = True

        # redirect to the appropriate dashboard page
        if employee.is_admin:
            access_token = create_access_token(identity={'email': employee.email,
                                                         'first_name': employee.first_name,
                                                         'last_name': employee.last_name,
                                                         'is_admin': True}, expires_delta=False)
        else:
            access_token = create_access_token(identity={'email': employee.email,
                                                         'first_name': employee.first_name,
                                                         'last_name': employee.last_name,
                                                         'is_admin': False}, expires_delta=False)
        results = {'token': access_token, 'is_admin': employee.is_admin, 'first_name': employee.first_name,
                   'last_name': employee.last_name}
    # when login details are incorrect
    else:
        results = {'error': 'invalid email or password.'}, 403
    return make_response(jsonify(results))


@auth.route('/logout', methods=['POST'])
@login_required
def logout():
    """
    Handle requests to the /logout route
    Log an employee out through the logout link
    """
    logout_user()
    session.pop('logged_in', None)

    # redirect to the login page
    return jsonify('Logout successful')


@auth.route('/api/token')
@http_auth.login_required
def get_auth_token():
    token = g.employee.generate_auth_token()
    return jsonify({'token': token.decode('ascii')})


@auth.route('/currentuser', methods=['GET'])
@jwt_required
def get_current_user():
    current_user = get_jwt_identity()
    return make_response(jsonify(logged_in_as=current_user)), 200
