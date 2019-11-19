from flask import request, json, jsonify
from . import loctite
import datetime
import os

from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_login import login_required

from app import db
from ..models import Loctite, LoctiteSchema, AuditLog, AuditLogSchema


@loctite.route('/save_loctite', methods=['POST'])
@jwt_required
def save_item():
    user = get_jwt_identity()
    if user["access"] == 1:
        return jsonify("Forbidden"), 403
    """
    Add a loctite
    """
    data = request.data
    data_js = json.loads(data)
    # pid = data_js.get('pid')
    name = data_js.get('name')
    description = data_js.get('description')
    price = data_js.get('price')
    quantity = data_js.get('quantity')
    batch = data_js.get('batch')
    expiry_date = data_js.get('expiry_date')
    file = data_js.get('file')

    item = Loctite(name=name, description=description, price=price, quantity=quantity, batch=batch, expiry_date=expiry_date, file=file)
    db.session.add(item)
    db.session.commit()
    auditlog_record(item, None, None, "create")
    loctite_schema = LoctiteSchema()

    return loctite_schema.jsonify(Loctite.query.get(item.pid)), 200


@loctite.route("/show_loctites")
@jwt_required
def show_items():
    """
    Display all loctite
    """
    items = Loctite.query.all()
    loctite_schema = LoctiteSchema(many=True)
    return loctite_schema.jsonify(items), 200


@loctite.route("/update_loctite/<int:pid>", methods=['GET', 'POST'])
@jwt_required
def update_items(pid):
    user = get_jwt_identity()
    if user["access"] == 1:
        return jsonify("Forbidden"), 403
    """
    Update loctite
    """
    if request.method == 'POST':
        # retrieve item from database
        item = Loctite.query.get_or_404(pid)

        # retrieve the data from request
        data = request.data
        data_js = json.loads(data)

        # get the individual values
        name = data_js.get('name')
        auditlog_record(item, "name", name, "edit")

        description = data_js.get('description')
        auditlog_record(item, "description", description, "edit")

        price = data_js.get('price')
        auditlog_record(item, "price", price, "edit")

        quantity = data_js.get('quantity')
        auditlog_record(item, "quantity", quantity, "edit")

        batch = data_js.get('batch')
        auditlog_record(item, "batch", batch, "edit")

        expiry_date = data_js.get('expiry_date')
        auditlog_record(item, "expiry_date", expiry_date, "edit")

        file = data_js.get('file')

        # update changes
        item.name = name
        item.description = description
        item.price = price
        item.quantity = quantity
        item.batch = batch
        item.expiry_date = expiry_date
        item.file = file
        item.updated_date = datetime.datetime.now()
        db.session.commit()

        # return response
        loctite_schema = LoctiteSchema()
        return loctite_schema.jsonify(Loctite.query.get(pid)), 200

    else:
        loctite_schema = LoctiteSchema()
        return loctite_schema.jsonify(Loctite.query.get(pid)), 200


@loctite.route("/update_loctites", methods=['GET', 'POST'])
@jwt_required
def update_multiple_items():
    user = get_jwt_identity()
    if user["access"] == 1:
        return jsonify("Forbidden"), 403
    """
    Update loctite
    """

    # retrieve the data from request
    data = request.data
    data_js = json.loads(data)
    for items in data_js:
        inn = items["name"]
        item = Loctite.query.filter_by(name=inn).first()

        # get the individual values
        name = items['name']
        auditlog_record(item, "name", name, "edit")

        description = items['description']
        auditlog_record(item, "description", description, "edit")

        price = items['price']
        auditlog_record(item, "price", price, "edit")

        quantity = items['quantity']
        auditlog_record(item, "quantity", quantity, "edit")

        batch = items['batch']
        auditlog_record(item, "batch", batch, "edit")

        expiry_date = items['expiry_date']
        auditlog_record(item, "expiry_date", expiry_date, "edit")

        file = items['file']

        # update changes
        item.name = name
        item.description = description
        item.price = price
        item.quantity = quantity
        item.batch = batch
        item.expiry_date = expiry_date
        item.file = file
        item.updated_date = datetime.datetime.now()
        db.session.commit()

    return jsonify("Updated")


@loctite.route("/delete_loctite/<int:pid>", methods=['POST'])
@jwt_required
def delete_items(pid):
    user = get_jwt_identity()
    if user["access"] == 1:
        return jsonify("Forbidden"), 403
    """
    Delete loctite
    """
    item = Loctite.query.get_or_404(pid)
    db.session.delete(item)
    db.session.commit()
    auditlog_record(item, None, None, "delete")
    return jsonify("item deleted"), 200


@loctite.route("/upload_image/<int:pid>", methods=['POST'])
@jwt_required
def upload_images(pid):
    """
    Upload images
    """
    pic = request.files['file']
    if pic.filename != '':
        pic_dir = os.path.join(os.path.abspath(os.curdir)) + "/", pic
        pic.save(pic_dir)

        item = Loctite.query.get_or_404(pid)
        item.file = pic_dir
        db.session.commit()

    return jsonify('File uploaded successfully'), 200


def auditlog_record(item, field, new_value, action):
    current_user = get_jwt_identity()
    user_name = current_user["first_name"]
    name = item["name"]

    if action == "edit":
        if field == "expiry_date":
            new_value = (datetime.datetime.strptime(new_value, '%Y-%m-%d').date())
        if item[field] != new_value:
            record = AuditLog(name, field, item[field], new_value, user_name, action)
            db.session.add(record)
            db.session.commit()

    elif action == "delete" or action == "create":
        record = AuditLog(name, None, None, None, user_name, action)
        db.session.add(record)
        db.session.commit()