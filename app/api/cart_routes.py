from flask import Blueprint
from app.models.Cart import Cart
from app.models.db import db
from app.models.Cart_Items import CartItem
from flask.json import jsonify
from app.models.menu_item import MenuItem


cart_route = Blueprint('cart_route',__name__)

@cart_route.route('/items')
def fullCart():
    allthem=CartItem.query.all()
    theFullList = []
    for item in allthem:
        theguy = item.to_dict()
        menu_items = int(theguy["menu_item_id"])
        menu_item = MenuItem.query.filter_by(menu_item_id: menu_items)
        theFullList.append(theguy)
        print(int(theguy["menu_item_id"]),"this is the item")
        print(menu_items)

    return theFullList
