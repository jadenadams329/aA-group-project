from flask import Blueprint, jsonify, request
from app.models import Menu, db, Restaurant, MenuItem
from app.forms import MenuItemForm
from sqlalchemy.orm import joinedload
from flask_login import current_user

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
    ## make sure user is logged in
    if not current_user.is_authenticated:
        return jsonify({"error": "Must be logged in"}), 401

    # get the current user id
    userId = current_user.to_dict()["id"]
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
    ## make sure user is logged in
    if not current_user.is_authenticated:
        return jsonify({"error": "Must be logged in"}), 401

    # get the current user id
    userId = current_user.to_dict()["id"]

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
@menu_routes.route('/<int:id>/items/new', methods=['POST'])
def create_menu_item(id):
    ## make sure user is logged in
    if not current_user.is_authenticated:
        return jsonify({"error": "Must be logged in"}), 401

    # get the current user id
    userId = current_user.to_dict()["id"]
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

    form = MenuItemForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        newItem = MenuItem(
            name=form.data['name'],
            price=form.data['price'],
            description=form.data['description'],
            category=form.data['category'],
            photo_url=form.data['photo_url'],
            menu_id = id
        )
        db.session.add(newItem)
        db.session.commit()
        return newItem.to_dict()
    return form.errors, 400
