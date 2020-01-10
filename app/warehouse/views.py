from flask import request, json, jsonify
from . import warehouse

from flask_jwt_extended import jwt_required

from app import db
from ..models import Warehouse, WarehouseSchema

warehouse_schema = WarehouseSchema()


@warehouse.route('/add_warehouse', methods=['POST'])
@jwt_required
def add_warehouse():
    data = request.data
    data_js = json.loads(data)
    wid = data_js.get('wid')
    name = data_js.get('name')
    location = data_js.get('location')

    wh = Warehouse(wid, name, location)
    db.session.add(wh)
    db.session.commit()
    return warehouse_schema.jsonify(Warehouse.query.get(wh.wid))


@warehouse.route('/update_warehouse/<int:wid>', methods=['POST', 'GET'])
@jwt_required
def update_warehouse(wid):
    if request.method == 'POST':
        # Read the JSON data
        data = request.data
        data_js = json.loads(data)
        name = data_js.get('name')
        location = data_js.get('location')

        # Get the warehouse from database
        wh = Warehouse.query.get_or_404(wid)

        # Update the values
        wh.wid = wid
        wh.name = name
        wh.location = location

        # Store in database
        db.session.commit()
        return warehouse_schema.jsonify(Warehouse.query.get(wh.wid))
    else:
        return warehouse_schema.jsonify(Warehouse.query.get(wid))


@warehouse.route('/delete_warehouse/<int:wid>', methods=['DELETE'])
@jwt_required
def delete_warehouse(wid):
    # Get the warehouse from database
    wh = Warehouse.query.get_or_404(wid)
    db.session.delete(wh)
    db.session.commit()
    return jsonify("Warehouse deleted"), 200


@warehouse.route('/show_warehouse', methods=['GET'])
@jwt_required
def show_warehouse():
    wh = Warehouse.query.all()
    all_warehouse_schema = WarehouseSchema(many=True)
    return all_warehouse_schema.jsonify(wh), 200

