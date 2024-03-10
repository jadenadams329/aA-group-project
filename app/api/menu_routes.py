from flask import Blueprint
from app.models import Menu, db
from sqlalchemy.orm import joinedload

menu_routes = Blueprint('menu', __name__)

@menu_routes.route('/')
def get_all_menus():
    menus = db.session.query(Menu).options(joinedload(Menu.menu_items))
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
        return {'error': 'Menu not found!'}

    menu_dict = menu.to_dict()
    menu_dict['menu_items'] = [menu_item.to_dict() for menu_item in menu.menu_items]

    return menu_dict

# @menu_routes.route('/<int:id>', methods=['PUT'])
# def update_menu(id):



@menu_routes.route('/<int:id>', methods=['DELETE'])
def delete_menu(id):
    menu = Menu.query.options(joinedload(Menu.menu_items)).get(id)

    if not menu:
        return {'error': 'Menu not found!'}

    db.session.delete(menu)
    db.session.commit()

    return {
        'message': 'Successfully Deleted!'
    }
