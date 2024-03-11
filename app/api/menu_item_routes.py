from flask import Blueprint, jsonify, request
from app.models import MenuItem, db

menu_item_routes = Blueprint('items', __name__)

@menu_item_routes.route('/<int:id>')
def get_menu_item_by_id(id):
    item = MenuItem.query.get(id)

    if not item:
        return jsonify({'error': 'Menu Item not found!'}), 404

    return item.to_dict()

@menu_item_routes.route('/<int:id>', methods=['PUT'])
def update_menu_item_by_id(id):
    item = MenuItem.query.get(id)

    if not item:
        return jsonify({'error': 'Menu Item not found!'}), 404

    data = request.json

    for key, value in data.items():
        setattr(item, key, value)

    db.session.commit()

    return item.to_dict()

@menu_item_routes.route('/<int:id>', methods=['DELETE'])
def delete_an_item_by_id(id):
    item = MenuItem.query.get(id)

    if not item:
        return jsonify({'error': 'Menu Item not found!'}), 404

    db.session.delete(item)
    db.session.commit()

    return {'message': 'Successfully Deleted!'}
