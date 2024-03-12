from flask import Blueprint
from app.models.Cart import Cart
from app.models.db import db
from app.models.Cart_Items import CartItem
from flask.json import jsonify


cart_route = Blueprint('cart_route',__name__)

@cart_route.route('/')
def fullCart():
    allthem=CartItem.query.all()
    theFullList = []
    for item in allthem:
        theguy = item.to_dict()
        theFullList.append(theguy)
        print(theguy,"this is the item")

    return theFullList
