from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Restaurant, Menu, db
from .auth_routes import authenticate

restaurant_routes = Blueprint('restaurants', __name__)

@restaurant_routes.route('')
def get_restaurants():
    try:
        restaurants = Restaurant.query.all()
        return {'restaurants': [restaurant.to_dict() for restaurant in restaurants]}
    except Exception as err:
        return jsonify(error=str(err)), 500

### Add A Menu to a specific Restaurant
@restaurant_routes.route('/<int:id>/menus', methods=['POST'])
def create_menu(id):
    data = authenticate()

    # check if there is a user
    if isinstance(data, tuple):
        (err, statusCode) = data
        return err, statusCode

    userId = data['id']
    restaurant = Restaurant.query.get(id)

    # check if the restaurant exist
    if not restaurant:
        return jsonify({'error': 'Restaurant not found!'}), 404

    restaurant_owner_id = restaurant.to_dict()['owner_id']

    # check if the user is the owner of the restaurant
    if userId != restaurant_owner_id:
        return jsonify({'message': 'Unauthorized'}), 401

    data = request.json
    data['restaurant_id'] = id

    newMenu = Menu(**data)

    db.session.add(newMenu)
    db.session.commit()

    return newMenu.to_dict()
