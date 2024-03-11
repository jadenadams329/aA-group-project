from flask import Blueprint, jsonify, request
from app.models import Menu, db
from sqlalchemy.orm import joinedload

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

    db.session.delete(menu)
    db.session.commit()

    return {'message': 'Successfully Deleted!'}
