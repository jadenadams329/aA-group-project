from flask import Blueprint, jsonify, request
from app.models import Menu, db, Restaurant
from sqlalchemy.orm import joinedload
from flask_login import current_user

menu_routes = Blueprint('menu', __name__)

@menu_routes.route('/')
def get_all_menus():
    menus = Menu.query.options(joinedload(Menu.menu_items)).all()
    menu_list = []

    for menu in menus:
        menu_dict = menu.to_dict()
        menu_dict['menu_items'] = [menu_item.to_dict() for menu_item in menu.menu_items]
        menu_list.append(menu_dict)

    return menu_list

@menu_routes.route('/<int:id>')
def get_one_menu(id):
    menu = Menu.query.options(joinedload(Menu.menu_items)).get(id)

    if not menu:
        return jsonify({'error': 'Menu not found!'}), 404

    menu_dict = menu.to_dict()
    menu_dict['menu_items'] = [menu_item.to_dict() for menu_item in menu.menu_items]

    return menu_dict

@menu_routes.route('/<int:id>', methods=['PUT'])
def update_menu_by_id(id):
    menu = Menu.query.get(id)

    if not menu:
        return jsonify({'error': 'Menu not found!'}), 404

    userId = current_user.to_dict()['id']
    restaurantId = menu.to_dict()['restaurant_id']

    restaurant = Restaurant.query.get(restaurantId)
    restaurant_owner_id = restaurant.to_dict()['owner_id']

    if userId != restaurant_owner_id:
        return {'message': 'Unauthorized'}, 401

    data = request.json

    for key, value in data.items():
        setattr(menu, key, value)

    menu_dict = menu.to_dict()
    menu_dict['menu_items'] = [menu_item.to_dict() for menu_item in menu.menu_items]

    return menu_dict

@menu_routes.route('/<int:id>', methods=['DELETE'])
def delete_menu(id):
    menu = Menu.query.options(joinedload(Menu.menu_items)).get(id)

    if not menu:
        return jsonify({'error': 'Menu not found!'}), 404

    userId = current_user.to_dict()['id']
    restaurantId = menu.to_dict()['restaurant_id']

    restaurant = Restaurant.query.get(restaurantId)
    restaurant_owner_id = restaurant.to_dict()['owner_id']

    if userId != restaurant_owner_id:
        return {'message': 'Unauthorized'}, 401

    db.session.delete(menu)
    db.session.commit()

    return {'message': 'Successfully Deleted!'}
