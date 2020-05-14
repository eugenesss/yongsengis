from flask import request, json, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import desc

from . import inventory
from functools import wraps
from .. import create_app

from boto3 import session
from botocore.client import Config

import os
import datetime
import csv

from app import db
from ..models import Inventory, InventorySchema, UpdateInventorySchema, get_all_items, get_item, get_item_by_warehouse, \
    AuditLog, AuditLogSchema, Employee, InventoryOrders, query_inventory, query_warehouse, query_category_warehouse

ACCESS_ID = 'DBDO6LSVA6XLHOPOELOR'
SECRET_KEY = 'F9n1Ouy1VpEO4w5bwRjbgGIuyzRiA0hF98UFZ3Cv1Ag'


@inventory.route('/save_item', methods=['GET', 'POST'])
@jwt_required
def save_item():
    user = get_jwt_identity()
    if user["access"] == 1:
        return jsonify("Forbidden"), 403
    """
    Add an item
    """
    # Retrieve the data from request
    data = request.data
    data_js = json.loads(data)

    # Get the individual values
    # pid = data_js.get('pid')
    name = data_js.get('name')
    description = data_js.get('description')
    code = data_js.get('code')
    material = data_js.get('material')
    price = data_js.get('price')
    quantity = data_js.get('quantity')
    perbox = data_js.get('perbox')
    location = data_js.get('location')
    file = data_js.get('file')
    wid = data_js.get('wid')
    cid = data_js.get('cid')
    rack = data_js.get('rack')
    unit_code = data_js.get('unit_code')

    # Add item to database
    item = Inventory(name=name, description=description, code=code, material=material,
                     price=price, quantity=quantity, perbox=perbox, location=location, file=file, wid=wid, cid=cid,
                     rack=rack, unit_code=unit_code)
    db.session.add(item)
    db.session.commit()
    auditlog_record(item, None, None, "create")
    inventory_schema = InventorySchema()
    return inventory_schema.jsonify(get_item(item.pid))


# @inventory.route("/show_items")
# @jwt_required
# def show_items():
#     """
#     Display all inventory
#     """
#     items = get_all_items()
#     inventories_schema = InventorySchema(many=True)
#     return inventories_schema.jsonify(items)


# @inventory.route("/show_items")
# @jwt_required
# def show_items():
#     """
#     Query all inventory
#     """
#     query = request.args.get('query')
#     limit = request.args.get('limit')
#     skip = request.args.get('skip')
#
#     create_app('development').logger.info(query)
#     if query is None:
#         items = get_all_items()
#     else:
#         items = query_inventory(query)
#     count = len(items.all())
#     items = items.limit(limit).offset(skip)
#     inventories_schema = InventorySchema(many=True)
#     results = {"count": count, "results": inventories_schema.dump(items)}
#     return jsonify(results)


@inventory.route("/update_item/<int:pid>", methods=['POST', 'GET'])
@jwt_required
def update_items(pid):
    user = get_jwt_identity()
    if user["access"] == 1:
        return jsonify("Forbidden"), 403
    """
    Update inventory
    """
    if request.method == 'POST':
        # Retrieve item from database
        item = Inventory.query.get_or_404(pid)

        # Retrieve the data from request
        data = request.data
        data_js = json.loads(data)

        # Get the individual values
        name = data_js.get('name')
        auditlog_record(item, "name", name, "edit")

        description = data_js.get('description')
        auditlog_record(item, "description", description, "edit")

        code = data_js.get('code')
        auditlog_record(item, "code", code, "edit")

        material = data_js.get('material')
        auditlog_record(item, "material", material, "edit")

        price = data_js.get('price')
        auditlog_record(item, "price", price, "edit")

        quantity = data_js.get('quantity')
        auditlog_record(item, "quantity", quantity, "edit")

        perbox = data_js.get('perbox')
        auditlog_record(item, "perbox", perbox, "edit")

        location = data_js.get('location')
        auditlog_record(item, "location", location, "edit")

        wid = data_js.get('wid')
        auditlog_record(item, "wid", wid, "edit")

        cid = data_js.get('cid')
        auditlog_record(item, "cid", cid, "edit")

        rack = data_js.get('rack')
        auditlog_record(item, "rack", rack, "edit")

        unit_code = data_js.get('unit_code')
        auditlog_record(item, "unit_code", unit_code, "edit")

        # Update the changes
        item.name = name
        item.description = description
        item.code = code
        item.material = material
        item.price = price
        item.quantity = quantity
        item.perbox = perbox
        item.location = location
        item.wid = wid
        item.cid = cid
        item.rack = rack
        item.unit_code = unit_code
        item.updated_date = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        db.session.commit()

        # Return response
        inventory_schema = UpdateInventorySchema()
        return inventory_schema.jsonify(get_item(pid))

    else:
        inventory_schema = UpdateInventorySchema()
        return inventory_schema.jsonify(get_item(pid))


@inventory.route("/update_items", methods=['POST', 'GET'])
@jwt_required
def update_multiple_items():
    user = get_jwt_identity()
    if user["access"] == 1:
        return jsonify("Forbidden"), 403
    """
    Update multiple items
    """
    list = ''
    data = request.data
    data_js = json.loads(data)
    for items in data_js:
        pid = items["pid"]
        item = Inventory.query.filter_by(pid=pid).first()
        # Get the individual values

        name = items['name']
        auditlog_record(item, "name", name, "edit")

        description = items['description']
        auditlog_record(item, "description", description, "edit")

        code = items['code']
        auditlog_record(item, "code", code, "edit")

        material = items['material']
        auditlog_record(item, "material", material, "edit")

        price = items['price']
        auditlog_record(item, "price", price, "edit")

        quantity = items['quantity']
        auditlog_record(item, "quantity", quantity, "edit")

        perbox = items['perbox']
        auditlog_record(item, "perbox", perbox, "edit")

        location = items['location']
        auditlog_record(item, "location", location, "edit")

        wid = items['wid']
        auditlog_record(item, "wid", wid, "edit")

        cid = items['cid']
        auditlog_record(item, "cid", cid, "edit")

        rack = items['rack']
        auditlog_record(item, "rack", rack, "edit")

        unit_code = items['unit_code']
        auditlog_record(item, "unit_code", unit_code, "edit")

        # Update the changes
        item.name = name
        item.description = description
        item.code = code
        item.material = material
        item.price = price
        item.quantity = quantity
        item.perbox = perbox
        item.location = location
        item.wid = wid
        item.cid = cid
        item.rack = rack
        item.unit_code = unit_code
        item.updated_date = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        db.session.commit()

        # Return response
        # inventory_schema = UpdateInventorySchema()

    return jsonify("Updated")


@inventory.route("/delete_item/<int:pid>", methods=['POST'])
@jwt_required
def delete_items(pid):
    user = get_jwt_identity()
    if user["access"] == 1:
        return jsonify("Forbidden"), 403
    """
    Delete inventory
    """
    item = Inventory.query.get_or_404(pid)
    auditlog_record(item, None, None, "delete")
    db.session.delete(item)
    db.session.commit()
    return jsonify("Item deleted"), 200


@inventory.route("/inventory/upload_image/<int:pid>", methods=['POST'])
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
    file_key = 'inventory/' + file.filename
    item = Inventory.query.get_or_404(pid)
    if item.file is not None:
        delete_image(item.file)

    client.upload_fileobj(Fileobj=file,
                          Bucket='ysis-space',
                          ExtraArgs={'ACL': 'public-read'},
                          Key=file_key)

    item.file = file_key
    db.session.commit()

    inventory_schema = UpdateInventorySchema()
    return inventory_schema.jsonify(get_item(pid))


def delete_image(file_key):
    sessions = session.Session()
    client = sessions.client('s3',
                            region_name='sgp1',
                            endpoint_url='https://ysis-space.sgp1.digitaloceanspaces.com',
                            aws_access_key_id=ACCESS_ID,
                            aws_secret_access_key=SECRET_KEY)

    client.delete_object(Bucket='ysis-space', Key=file_key)


@inventory.route("/warehouse/<int:wid>", methods=["GET"])
@jwt_required
def get_by_warehouse(wid):
    """
    Search by warehouse
    """
    query = request.args.get('query')
    limit = request.args.get('limit')
    skip = request.args.get('skip')

    if query is None:
        items = get_item_by_warehouse(wid)
    else:
        items = query_warehouse(query)
        items = items.filter(Inventory.wid == wid)
    count = len(items.all())
    items = items.limit(limit).offset(skip)
    inventories_schema = InventorySchema(many=True)
    results = {"count": count, "results": inventories_schema.dump(items)}
    return jsonify(results)


@inventory.route("/show_items", methods=["GET"])
@jwt_required
def get_by_warehouse_category():
    """
    Search by warehouse
    """
    query = request.args.get('query')
    create_app('development').logger.info(query)
    limit = request.args.get('limit')
    skip = request.args.get('skip')
    wid = request.args.get('wid')
    cid = request.args.get('cid')
    order_by = request.args.get('orderBy')
    column = request.args.get('column')

    items = get_all_items()
    count = len(items.all())

    # if warehouse is not all
    if cid != 'all':
        items = items.filter(Inventory.cid == cid)
    # if category is not all
    if wid != 'all':
        items = items.filter(Inventory.wid == wid)
    if query:
        create_app('development').logger.info("query is not none")
        look_for = '%{0}%'.format(query)
        items = items.filter(Inventory.name.ilike(look_for) | Inventory.material.ilike(look_for))
    if column:
        items = items.order_by("Inventory." + column + " " + order_by)
    if count == 0:
        results = None
    else:
        items = items.limit(limit).offset(skip)
        inventories_schema = InventorySchema(many=True)
        results = {"count": count, "results": inventories_schema.dump(items)}
    return jsonify(results)


@inventory.route("/inventory/auditlog")
@jwt_required
def show_auditlog():
    """
    Display all inventory
    """
    logs = db.session.query(AuditLog).filter(AuditLog.product == "inventory").order_by('date_time desc').all()
    audit_schema = AuditLogSchema(many=True)
    return audit_schema.jsonify(logs)


def auditlog_record(item, field, new_value, action):
    current_user = get_jwt_identity()
    user_name = current_user["first_name"]
    name = item["name"]
    product = "inventory"

    if action == "edit":
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


@inventory.route("/inventory/import", methods=["POST"])
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
            item = Inventory(name=csv_dicts[i].get('name', None),
                             description=csv_dicts[i].get('description', None),
                             code=csv_dicts[i].get('code', None),
                             material=csv_dicts[i].get('material', None),
                             price=csv_dicts[i].get('price', None),
                             location=csv_dicts[i].get('location', None),
                             quantity=csv_dicts[i].get('quantity', None),
                             perbox=csv_dicts[i].get('perbox', None),
                             file=csv_dicts[i].get('file', None),
                             wid=csv_dicts[i].get('wid', None),
                             cid=csv_dicts[i].get('cid', None),
                             rack=csv_dicts[i].get('rack', None),
                             unit_code=csv_dicts[i].get('unit_code', None))
            db.session.add(item)
            db.session.commit()
            auditlog_record(item, None, None, "create")

    return jsonify("imported successfully", 200)


@inventory.route("/inventory/adjustment", methods=["POST"])
@jwt_required
def stock_adjustment():

    # retrieve the data from request
    data = request.data
    data_js = json.loads(data)

    pid = data_js.get("pid")
    item = Inventory.query.filter_by(pid=pid).first()

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
    orders = InventoryOrders(pid, count, current_stock, adjustment_type,
                             datetime.datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S'))
    db.session.add(orders)
    db.session.commit()

    inventory_schema = UpdateInventorySchema()

    return inventory_schema.jsonify(get_item(pid))


