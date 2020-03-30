from flask import request, json, jsonify
from . import loctite
import datetime
import os
import csv

from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_login import login_required
from boto3 import session

from app import db
from ..models import Loctite, LoctiteSchema, AuditLog, AuditLogSchema, LoctiteOrders

ACCESS_ID = 'DBDO6LSVA6XLHOPOELOR'
SECRET_KEY = 'F9n1Ouy1VpEO4w5bwRjbgGIuyzRiA0hF98UFZ3Cv1Ag'

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
        item.updated_date = datetime.datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S')
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
        pid = items["pid"]
        item = Loctite.query.filter_by(pid=pid).first()

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
        item.updated_date = datetime.datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S')
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


@loctite.route("/loctite/upload_image/<int:pid>", methods=['POST'])
@jwt_required
def upload_image(pid):
    """
    Upload images
    """
    sessions = session.Session()
    client = sessions.client('s3',
                            region_name='sgp1',
                            endpoint_url='https://ysis-space.sgp1.digitaloceanspaces.com',
                            aws_access_key_id=ACCESS_ID,
                            aws_secret_access_key=SECRET_KEY)

    file = request.files['file']
    file_key = 'loctite/' + file.filename
    item = Loctite.query.get_or_404(pid)
    if item.file is not None:
        delete_image(item.file)

    client.upload_fileobj(Fileobj=file,
                          Bucket='ysis-space',
                          ExtraArgs={'ACL': 'public-read'},
                          Key=file_key)

    item.file = file_key
    db.session.commit()

    loctite_schema = LoctiteSchema()
    return loctite_schema.jsonify(Loctite.query.get(pid)), 200


def delete_image(file_key):
    sessions = session.Session()
    client = sessions.client('s3',
                            region_name='sgp1',
                            endpoint_url='https://ysis-space.sgp1.digitaloceanspaces.com',
                            aws_access_key_id=ACCESS_ID,
                            aws_secret_access_key=SECRET_KEY)

    client.delete_object(Bucket='ysis-space', Key=file_key)


@loctite.route("/loctite/auditlog")
@jwt_required
def show_auditlog():
    """
    Display all inventory
    """
    logs = db.session.query(AuditLog).filter(AuditLog.product == "loctite").all()
    audit_schema = AuditLogSchema(many=True)
    return audit_schema.jsonify(logs)


def auditlog_record(item, field, new_value, action):
    current_user = get_jwt_identity()
    user_name = current_user["first_name"]
    name = item["name"]
    product = "loctite"

    if action == "edit":
        if field == "expiry_date":
            new_value = (datetime.datetime.strptime(new_value, '%Y-%m-%d').date())
        if item[field] != new_value:
            record = AuditLog(name, field, item[field], new_value, datetime.datetime.utcnow(), user_name, action,
                              product)
            db.session.add(record)
            db.session.commit()

    elif action == "in adjustment" or action == "out adjustment":
        record = AuditLog(name, field, None, new_value, datetime.datetime.utcnow(), user_name, action, product)
        db.session.add(record)
        db.session.commit()

    else:
        record = AuditLog(name, None, None, None, datetime.datetime.utcnow(), user_name, action, product)
        db.session.add(record)
        db.session.commit()


@loctite.route("/loctite/import", methods=["POST"])
@jwt_required
def import_csv():
    if request.method == 'POST':

        # create variable for uploaded file
        f = request.files['fileupload']

        # store the file contents as a string
        fstring = f.read()

        # decode the file as it contains BOM signature
        fdecode = fstring.decode("utf-8-sig")

        # create list of dictionaries keyed by header row
        csv_dicts = [{k: v for k, v in row.items()} for
                     row in csv.DictReader(fdecode.splitlines(), skipinitialspace=True)]

        for i in range(len(csv_dicts)):
            # Add item to database
            item = Loctite(name=csv_dicts[i].get('name', None),
                           description=csv_dicts[i].get('description', None),
                           price=csv_dicts[i].get('price', None),
                           quantity=csv_dicts[i].get('quantity', None),
                           file=csv_dicts[i].get('file', None),
                           batch=csv_dicts[i].get('batch', None),
                           expiry_date=csv_dicts[i].get('expiry_date', None))
            db.session.add(item)
            db.session.commit()
            auditlog_record(item, None, None, "create")

    return jsonify("imported successfully", 200)


@loctite.route("/loctite/adjustment", methods=["POST"])
@jwt_required
def stock_adjustment():

    # retrieve the data from request
    data = request.data
    data_js = json.loads(data)

    pid = data_js.get("pid")
    item = Loctite.query.filter_by(pid=pid).first()

    count = data_js.get('count')
    results = data_js.get('results')

    adjustment_type = None

    current_stock = item.quantity
    if results == "out":
        item.quantity = current_stock - count
        item.updated_date = datetime.datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S')
        auditlog_record(item, "quantity", count, "in adjustment")
        adjustment_type = "out"

    elif results == "in":
        item.quantity = current_stock + count
        item.updated_date = datetime.datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S')
        auditlog_record(item, "quantity", count, "out adjustment")
        adjustment_type = "in"

    # save loctite orders for widget
    orders = LoctiteOrders(pid, count, current_stock, adjustment_type,
                             datetime.datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S'))
    db.session.add(orders)
    db.session.commit()

    loctite_schema = LoctiteSchema()

    return loctite_schema.jsonify(Loctite.query.get(pid)), 200


