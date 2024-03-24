from flask import Blueprint, jsonify, request
from app.models import MenuItem, db, Menu, Restaurant
from flask_login import current_user
from app.forms import EditItemForm

menu_item_routes = Blueprint('items', __name__)

### Get all menu items
@menu_item_routes.route('/')
def get_all_menu_items():
    items = MenuItem.query.all()
    itemList = []
    for item in items:
        item_dict = item.to_dict()
        itemList.append(item_dict)

    return itemList

### Get a menu item by Id
@menu_item_routes.route('/<int:id>')
def get_menu_item_by_id(id):
    item = MenuItem.query.get(id)

    if not item:
        return jsonify({'error': 'Menu Item not found!'}), 404

    return item.to_dict()

### Update a menu item by id
@menu_item_routes.route('/<int:id>', methods=['PUT'])
def update_menu_item_by_id(id):
    ## make sure user is logged in
    if not current_user.is_authenticated:
        return jsonify({"error": "Must be logged in"}), 401

    # get the current user id
    userId = current_user.to_dict()["id"]

    item = MenuItem.query.get(id)

    # check if the item exists
    if not item:
        return jsonify({'error': 'Menu Item not found!'}), 404

    menu_id = item.to_dict()['menu_id']
    menu = Menu.query.get(menu_id)
    restaurantId = menu.to_dict()['restaurant_id']
    restaurant = Restaurant.query.get(restaurantId)
    restaurant_owner_id = restaurant.to_dict()['owner_id']

    # check if the user is the owner of the restaurant
    if userId != restaurant_owner_id:
        return jsonify({'message': 'Unauthorized'}), 401

    form = EditItemForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        item.id = id
        item.name = form.name.data
        item.price = form.price.data
        item.description = form.description.data
        item.category = form.category.data
        item.photo_url = form.photo_url.data
        db.session.commit()
        return item.to_dict()
    return form.errors, 400

### delete a menu item by id
@menu_item_routes.route('/<int:id>', methods=['DELETE'])
def delete_an_item_by_id(id):
    ## make sure user is logged in
    if not current_user.is_authenticated:
        return jsonify({"error": "Must be logged in"}), 401

    # get the current user id
    userId = current_user.to_dict()["id"]

    item = MenuItem.query.get(id)

    # check if the item exists
    if not item:
        return jsonify({'error': 'Menu Item not found!'}), 404

    menu_id = item.to_dict()['menu_id']
    menu = Menu.query.get(menu_id)
    restaurantId = menu.to_dict()['restaurant_id']
    restaurant = Restaurant.query.get(restaurantId)
    restaurant_owner_id = restaurant.to_dict()['owner_id']

    # check if the user owns the restaurant
    if userId != restaurant_owner_id:
        return jsonify({'message': 'Unauthorized'}), 401

    db.session.delete(item)
    db.session.commit()

    return jsonify({'message': 'Successfully Deleted!'})
