from flask import Blueprint
from app.models.Cart import Cart
from app.models.db import db
from app.models.Cart_Items import CartItem
from flask.json import jsonify
from app.models.menu_item import MenuItem


cart_route = Blueprint('cart_route',__name__)

@cart_route.route('/items')
def fullCart():
    activeCart = Cart.query.filter(Cart.purchased == False)
    wholeCart = None
    for item in activeCart:
      item = item.to_dict()
      wholeCart= item

    print(wholeCart['restaurant_id'],'this is the active cart ```````````````')
    restId = wholeCart["restaurant_id"]
    print(type(restId),'restaurant id')
    print(restId,'restaurant id')
    allthem=CartItem.query.all()
    theFullList = []
    for item in allthem:
        theguy = item.to_dict()
        itemid = theguy["menu_item_id"]
        theItem = MenuItem.query.get(itemid)
        final=theItem.to_dict()
        Kart = {
           "name": final['name'],
           "photo_url": final["photo_url"],
           "price": final["price"],
           "quantity": theguy["quantity"]
        }
        print(theguy,'this is the final result i need')
        print(theItem,"finding the items$$$$$$$$$$$$$$$$$$$$$$$$$")
        theFullList.append(Kart)



    return theFullList
