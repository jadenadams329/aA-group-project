from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Restaurant

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
        print(id)
        if not restaurant:
            return jsonify(error="Restaurant not found"), 404

        return restaurant.to_dict(), 200
    except Exception as err:
        return jsonify(error=str(err)), 500
