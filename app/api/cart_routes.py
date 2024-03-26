from flask import Blueprint
from app.models.Cart import Cart
from app.models.db import db
from app.models.Cart_Items import CartItem
from flask.json import jsonify
from app.models.menu_item import MenuItem


cart_route = Blueprint('cart_route',__name__)

@cart_route.route('/items',methods=['GET'])
def fullCart():
    activeCart = Cart.query.filter(Cart.purchased == False)
    wholeCart = None
    for item in activeCart:
      item = item.to_dict()
      wholeCart= item

    restId = wholeCart["restaurant_id"]

    allthem=CartItem.query.all()
    theFullList = []
    for item in allthem:
        theguy = item.to_dict()
        itemid = theguy["menu_item_id"]
        theItem = MenuItem.query.get(itemid)
        final=theItem.to_dict()
        Kart = {
           'id':final["id"],
           "name": final['name'],
           "photo_url": final["photo_url"],
           "price": final["price"],
           "quantity": theguy["quantity"],
           "restaurant": restId
        }


        theFullList.append(Kart)

    return theFullList





@cart_route.route('/items/<int:id>/add',methods=['PUT'])
def addItems(id):
  item= CartItem.query.get(id)
  item.quantity += 1
  db.session.commit()
  return item.to_dict()








# @cart_route.route('/items/<int:id>',methods=['PUT'])
# def removeItems(id):
#    item=CartItem.query.get(id)
#    newone = item.to_dict()
#    print(newone['quantity'],'this is the item**************************************************************************')
#    if(int(newone['quantity']) > 1):
#     item.quantity -= 1
#     db.session.commit()
#     return fullCart()
#    else:
#      db.session.delete(item)
#      db.session.commit()
#      return fullCart()








@cart_route.route('/items/<int:id>',methods=['POST'])
def addToCart(id):
  theItem = MenuItem.query.get(id)
  newitem = theItem.to_dict()
  findme = Cart.query.filter(Cart.purchased == False)

  thatguy= None
  for item in findme:
     thisGuy = item.to_dict()
     thatguy = thisGuy
  cart = fullCart()
  newCart = []
  for item in cart:
     newCart.append(item)

     if(item['id'] == newitem['id']):

       final = CartItem.query.filter(CartItem.menu_item_id == id).first()


       if final:
        final.quantity += 1
        db.session.commit()
        return fullCart()


  newGuy = CartItem(cart_id = thatguy['id'],menu_item_id=newitem['id'],quantity=1)
  db.session.add(newGuy)
  db.session.commit()

  return fullCart()
