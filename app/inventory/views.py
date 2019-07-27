from flask import request, json, jsonify
from flask_jwt_extended import jwt_required
from . import inventory
import os
import datetime

from app import db
from ..models import Inventory, InventorySchema, UpdateInventorySchema, get_all_items, get_item, get_item_by_warehouse


@inventory.route('/save_item', methods=['GET', 'POST'])
@jwt_required
def save_item():
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
        description = data_js.get('description')
        code = data_js.get('code')
        material = data_js.get('material')
        price = data_js.get('price')
        quantity = data_js.get('quantity')
        perbox = data_js.get('perbox')
        location = data_js.get('location')
        img_file = data_js.get('file')
        wid = data_js.get('wid')
        cid = data_js.get('cid')
        rack = data_js.get('rack')
        unit_code = data_js.get('unit_code')

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


@inventory.route("/delete_item/<int:pid>", methods=['POST'])
@jwt_required
def delete_items(pid):
    """
    Delete inventory
    """
    item = Inventory.query.get_or_404(pid)
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
