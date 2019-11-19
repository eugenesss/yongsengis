from flask import request, json, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from . import inventory
from functools import wraps

import os
import datetime

from app import db
from ..models import Inventory, InventorySchema, UpdateInventorySchema, get_all_items, get_item, get_item_by_warehouse, \
    AuditLog, AuditLogSchema, Employee


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


@inventory.route("/show_items")
@jwt_required
def show_items():
    """
    Display all inventory
    """
    items = get_all_items()
    inventories_schema = InventorySchema(many=True)
    return inventories_schema.jsonify(items)


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

        img_file = data_js.get('file')
        auditlog_record(item, "file", img_file, "edit")

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
        item.file = img_file
        item.cid = cid
        item.rack = rack
        item.unit_code = unit_code
        item.updated_date = datetime.datetime.now()
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
        inn = items["code"]
        item = Inventory.query.filter_by(code=inn).first()
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
        item.updated_date = datetime.datetime.now()
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


@inventory.route("/upload_image/<int:pid>", methods=['POST'])
@jwt_required
def upload_images(pid):
    """
    Upload images
    """
    pic = request.files['file']
    if pic.filename != '':
        pic_dir = os.path.join(os.path.abspath(os.curdir)) + "/", pic
        pic.save(pic_dir)

        item = Inventory.query.get_or_404(pid)
        item.filename = pic_dir
        db.session.commit()

    return jsonify('File uploaded successfully'), 200


@inventory.route("/warehouse/<int:wid>", methods=["GET"])
@jwt_required
def get_by_warehouse(wid):
    """
    Search by warehouse
    """
    items = get_item_by_warehouse(wid)
    inventories_schema = InventorySchema(many=True)
    return inventories_schema.jsonify(items)


@inventory.route("/auditlog")
@jwt_required
def show_auditlog():
    """
    Display all inventory
    """
    logs = AuditLog.query.all()
    audit_schema = AuditLogSchema(many=True)
    return audit_schema.jsonify(logs)


def auditlog_record(item, field, new_value, action):
    current_user = get_jwt_identity()
    user_name = current_user["first_name"]
    name = item["name"]

    if action == "edit":
        if item[field] != new_value:
            record = AuditLog(name, field, item[field], new_value, user_name, action)
            db.session.add(record)
            db.session.commit()

    elif action == "delete" or action == "create":
        record = AuditLog(name, None, None, None, user_name, action)
        db.session.add(record)
        db.session.commit()




