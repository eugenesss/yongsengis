from flask import flash, redirect, render_template, url_for, request, jsonify, make_response, json, g, session
from flask_login import login_required, login_user, logout_user

from . import auth
from .. import db, http_auth
from ..models import Employee, UserSchema
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from functools import wraps


@auth.route('/create_user', methods=['POST'])
@jwt_required
def create_user():
    """
    Handle requests to the /register route
    Add an employee to the database through the registration form
    """
    user = get_jwt_identity()
    if user["access"] == 1:
        return jsonify("Forbidden"), 403

    # Retrieve the data from request
    data = request.data
    data_js = json.loads(data)

    # Get the individual values
    email = data_js.get('email')
    username = data_js.get('username')
    first_name = data_js.get('first_name')
    last_name = data_js.get('last_name')
    password = data_js.get('password')
    access = data_js.get('access')
    employee = Employee(email=email, username=username, first_name=first_name, last_name=last_name, password=password, access=access)

    db.session.add(employee)
    db.session.commit()

    # redirect to the login page
    return jsonify('successfully registered'), 200


@auth.route('/show_users', methods=['GET'])
@jwt_required
def show_users():
    """
        Display all users
        """
    users = Employee.query.all()
    user_schema = UserSchema(many=True)
    return user_schema.jsonify(users)


@auth.route("/update_user/<int:uid>", methods=['GET', 'POST'])
def update_user(uid):
    # Retrieve user from database
    user = Employee.query.get_or_404(uid)

    if request.method == 'POST':
        # Retrieve the data from request
        data = request.data
        data_js = json.loads(data)

        # retrieve the individual values
        email = data_js.get('email')
        username = data_js.get('username')
        first_name = data_js.get('first_name')
        last_name = data_js.get('last_name')
        # password = data_js.get('password')
        access = data_js.get('access')

        # Update the changes
        user.email = email
        user.username = username
        user.first_name = first_name
        user.last_name = last_name
        # user.password = password
        user.access = access
        db.session.commit()

    user_schema = UserSchema()
    return user_schema.jsonify(user)


@auth.route("/delete_user/<int:uid>", methods=['POST'])
@jwt_required
def delete_items(uid):
    user = get_jwt_identity()
    if user["access"] == 1:
        return jsonify("Forbidden"), 403
    """
    Delete inventory
    """
    user = Employee.query.get_or_404(uid)
    db.session.delete(user)
    db.session.commit()
    return jsonify("User deleted"), 200


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
                                                         'access': employee.access,
                                                         'is_admin': True}, expires_delta=False)
        else:
            access_token = create_access_token(identity={'email': employee.email,
                                                         'first_name': employee.first_name,
                                                         'last_name': employee.last_name,
                                                         'access': employee.access,
                                                         'is_admin': False}, expires_delta=False)
        results = {'token': access_token, 'is_admin': employee.is_admin, 'first_name': employee.first_name,
                   'last_name': employee.last_name, 'access': employee.access}
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


def requires_access_level(access_level):
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            user = get_jwt_identity()
            if user.allowed(access_level):
                return redirect(url_for('users.profile', message="You do not have access to that page. Sorry!"))
            return f(*args, **kwargs)
        return decorated_function
    return decorator