from flask import Blueprint, jsonify, request
from app.models import MenuItem, db, Menu, Restaurant
from .auth_routes import authenticate
from flask_login import current_user

menu_item_routes = Blueprint('items', __name__)

# Get all menu items
@menu_item_routes.route('/')
def get_all_menu_items():
    items = MenuItem.query.all()
    itemList = []
    for item in items:
        item_dict = item.to_dict()
        itemList.append(item_dict)

    return itemList

# Get a menu item by Id
@menu_item_routes.route('/<int:id>')
def get_menu_item_by_id(id):
    item = MenuItem.query.get(id)

    if not item:
        return jsonify({'error': 'Menu Item not found!'}), 404

    return item.to_dict()

# Update a menu item by id
@menu_item_routes.route('/<int:id>', methods=['PUT'])
def update_menu_item_by_id(id):
    data = authenticate()

    if isinstance(data, tuple):
        (err, statusCode) = data
        return err, statusCode

    userId = data['id']

    item = MenuItem.query.get(id)

    if not item:
        return jsonify({'error': 'Menu Item not found!'}), 404

    menu_id = item.to_dict()['menu_id']
    menu = Menu.query.get(menu_id)
    restaurantId = menu.to_dict()['restaurant_id']
    restaurant = Restaurant.query.get(restaurantId)
    restaurant_owner_id = restaurant.to_dict()['owner_id']

    if userId != restaurant_owner_id:
        return jsonify({'message': 'Unauthorized'}), 401

    data = request.json

    for key, value in data.items():
        setattr(item, key, value)

    db.session.commit()

    return item.to_dict()


# delete a menu item by id
@menu_item_routes.route('/<int:id>', methods=['DELETE'])
def delete_an_item_by_id(id):
    data = authenticate()

    if isinstance(data, tuple):
        (err, statusCode) = data
        return err, statusCode

    userId = data['id']

    item = MenuItem.query.get(id)

    if not item:
        return jsonify({'error': 'Menu Item not found!'}), 404

    menu_id = item.to_dict()['menu_id']
    menu = Menu.query.get(menu_id)
    restaurantId = menu.to_dict()['restaurant_id']
    restaurant = Restaurant.query.get(restaurantId)
    restaurant_owner_id = restaurant.to_dict()['owner_id']

    if userId != restaurant_owner_id:
        return jsonify({'message': 'Unauthorized'}), 401

    db.session.delete(item)
    db.session.commit()

    return jsonify({'message': 'Successfully Deleted!'})
