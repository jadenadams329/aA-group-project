from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Restaurant, Menu, db
from flask_login import current_user
from app.forms import RestaurantForm, MenuForm

restaurant_routes = Blueprint("restaurants", __name__)


@restaurant_routes.route("")
def get_restaurants():
    try:
        restaurants = Restaurant.query.all()
        return {
            "restaurants": [restaurant.to_dict() for restaurant in restaurants]
        }, 200
    except Exception as err:
        return jsonify(error=str(err)), 500


@restaurant_routes.route("/<int:id>", methods=["GET"])
def get_restaurant_by_id(id):
    try:
        restaurant = Restaurant.query.get(id)
        if not restaurant:
            return jsonify(error="Restaurant not found"), 404

        return restaurant.to_dict(), 200
    except Exception as err:
        return jsonify(error=str(err)), 500

### Get All Menus from a specific Restaurant
@restaurant_routes.route('/<int:id>/menus')
def get_restaurants_menu_by_id(id):
    restaurant = Restaurant.query.get(id)

    if not restaurant:
        return jsonify({'error': 'Restaurant not found!'}), 404

    menus = Menu.query.filter(Menu.restaurant_id == id).all()
    menus_list = []
    for menu in menus:
        menu_dict = menu.to_dict()
        menu_dict['menu_items'] = [menu_item.to_dict() for menu_item in menu.menu_items]
        menus_list.append(menu_dict)

    return menus_list

## Add a restaurant
@restaurant_routes.route("", methods=["POST"])
def add_restaurant():
    try:
        ## make sure user is logged in
        if not current_user.is_authenticated:
            return jsonify({"error": "Must be logged in to add restaurant"}), 401

        # get the current user id
        userId = current_user.to_dict()["id"]
        form = RestaurantForm()

        form["csrf_token"].data = request.cookies["csrf_token"]
        # validate incoming request data
        if form.validate_on_submit():
            restaurant = Restaurant(
                name=form.data["name"],
                logo=form.data["logo"],
                address=form.data["address"],
                city=form.data["city"],
                state=form.data["state"],
                zip_code=form.data["zip_code"],
                owner_id=userId,
            )
            db.session.add(restaurant)
            db.session.commit()
            return restaurant.to_dict()
        return form.errors, 400
    except Exception as err:
        return jsonify(error=str(err)), 500


### Add A Menu to a specific Restaurant
@restaurant_routes.route("/<int:id>/menus", methods=["POST"])
def create_menu(id):
    ## make sure user is logged in
    if not current_user.is_authenticated:
        return jsonify({"error": "Must be logged in"}), 401

    # get the current user id
    userId = current_user.to_dict()["id"]

    restaurant = Restaurant.query.get(id)

    # check if the restaurant exist
    if not restaurant:
        return jsonify({"error": "Restaurant not found!"}), 404

    restaurant_owner_id = restaurant.to_dict()["owner_id"]

    # check if the user is the owner of the restaurant
    if userId != restaurant_owner_id:
        return jsonify({"message": "Unauthorized"}), 401

    if len(restaurant.menus) > 3:
        return jsonify({"error": "Only 4 menus are allowed for a restaurant"}), 400

    form = MenuForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    form.restaurant_id = id

    if form.validate_on_submit():
        newMenu = Menu(
            name=form.data['name'],
            restaurant_id=id
        )
        db.session.add(newMenu)
        db.session.commit()
        return newMenu.to_dict()
    return form.errors, 400
