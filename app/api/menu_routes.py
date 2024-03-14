from flask import Blueprint, jsonify, request
from app.models import Menu, db, Restaurant, MenuItem
from sqlalchemy.orm import joinedload
from .auth_routes import authenticate

menu_routes = Blueprint('menu', __name__)

### Get All Menus
@menu_routes.route('/')
def get_all_menus():
    menus = Menu.query.options(joinedload(Menu.menu_items)).all()
    menu_list = []

    for menu in menus:
        menu_dict = menu.to_dict()
        menu_dict['menu_items'] = [menu_item.to_dict() for menu_item in menu.menu_items]
        menu_list.append(menu_dict)

    return menu_list

### Get a specific menu
@menu_routes.route('/<int:id>')
def get_one_menu(id):
    menu = Menu.query.options(joinedload(Menu.menu_items)).get(id)

    if not menu:
        return jsonify({'error': 'Menu not found!'}), 404

    menu_dict = menu.to_dict()
    menu_dict['menu_items'] = [menu_item.to_dict() for menu_item in menu.menu_items]

    return menu_dict

### Update a specific menu by menu ID
@menu_routes.route('/<int:id>', methods=['PUT'])
def update_menu_by_id(id):
    data = authenticate()

    # check if there is a user
    if isinstance(data, tuple):
        (err, statusCode) = data
        return err, statusCode

    userId = data['id']
    menu = Menu.query.get(id)

    # check if the menu exist
    if not menu:
        return jsonify({'error': 'Menu not found!'}), 404

    restaurantId = menu.to_dict()['restaurant_id']

    restaurant = Restaurant.query.get(restaurantId)
    restaurant_owner_id = restaurant.to_dict()['owner_id']

    # check if the user is the owner of the restaurant
    if userId != restaurant_owner_id:
        return jsonify({'message': 'Unauthorized'}), 401

    data = request.json

    for key, value in data.items():
        setattr(menu, key, value)

    menu_dict = menu.to_dict()
    menu_dict['menu_items'] = [menu_item.to_dict() for menu_item in menu.menu_items]

    return menu_dict

### Delete a menu by ID
@menu_routes.route('/<int:id>', methods=['DELETE'])
def delete_menu(id):
    data = authenticate()

    # check if there is a user
    if isinstance(data, tuple):
        (err, statusCode) = data
        return err, statusCode

    userId = data['id']
    menu = Menu.query.options(joinedload(Menu.menu_items)).get(id)

    # check if the menu exist
    if not menu:
        return jsonify({'error': 'Menu not found!'}), 404

    restaurantId = menu.to_dict()['restaurant_id']

    restaurant = Restaurant.query.get(restaurantId)
    restaurant_owner_id = restaurant.to_dict()['owner_id']

    # check if the user is the owner of the restaurant
    if userId != restaurant_owner_id:
        return jsonify({'message': 'Unauthorized'}), 401

    db.session.delete(menu)
    db.session.commit()

    return jsonify({'message': 'Successfully Deleted!'})

### Create a menu item by menu Id
@menu_routes.route('/<int:id>/items', methods=['POST'])
def create_menu_item(id):
    data = authenticate()

    # check if there is a user
    if isinstance(data, tuple):
        (err, statusCode) = data
        return err, statusCode

    userId = data['id']
    menu = Menu.query.options(joinedload(Menu.menu_items)).get(id)

    # check if the menu exists
    if not menu:
        return jsonify({'error': 'Menu not found!'}), 404

    restaurantId = menu.to_dict()['restaurant_id']

    restaurant = Restaurant.query.get(restaurantId)
    restaurant_owner_id = restaurant.to_dict()['owner_id']

    # check if the user owns the restaurant
    if userId != restaurant_owner_id:
        return jsonify({'message': 'Unauthorized'}), 401

    data = request.json
    data['menu_id'] = id
    item = MenuItem(**data)

    db.session.add(item)
    db.session.commit()

    return item.to_dict()
