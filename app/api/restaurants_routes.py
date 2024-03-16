from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Restaurant, Menu, db
from .auth_routes import authenticate
from flask_login import current_user
from app.forms import RestaurantForm

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
    data = authenticate()

    # check if there is a user
    if isinstance(data, tuple):
        (err, statusCode) = data
        return err, statusCode

    userId = data["id"]
    restaurant = Restaurant.query.get(id)

    # check if the restaurant exist
    if not restaurant:
        return jsonify({"error": "Restaurant not found!"}), 404

    restaurant_owner_id = restaurant.to_dict()["owner_id"]

    # check if the user is the owner of the restaurant
    if userId != restaurant_owner_id:
        return jsonify({"message": "Unauthorized"}), 401

    data = request.json
    data["restaurant_id"] = id

    newMenu = Menu(**data)

    db.session.add(newMenu)
    db.session.commit()

    return newMenu.to_dict()
