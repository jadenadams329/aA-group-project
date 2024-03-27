from flask import Blueprint,request
from app.models.Cart import Cart
from app.models.db import db
from app.models.Cart_Items import CartItem
from flask.json import jsonify
from app.models.menu_item import MenuItem
from flask_login import current_user
from app.models.menu import Menu


cart_route = Blueprint('cart_route',__name__)

@cart_route.route('/items',methods=['GET'])
def fullCart():
    activeCart = Cart.query.filter(Cart.purchased == False).first()
    if activeCart == None:
       hi='hi'
       return []
    if activeCart:
       wholeCart = activeCart.to_dict()
    # for item in activeCart:
    #   item = item.to_dict()
    #   wholeCart= item

    print(activeCart,'.......................................................................................................................................................................................................................................')

    allthem = CartItem.query.all()
    theFullList = []
    for item in allthem:
        theguy = item.to_dict()
        itemid = theguy["menu_item_id"]
        theItem = MenuItem.query.get(itemid)
        final=theItem.to_dict()
        menu = Menu.query.get(final['menu_id'])
        jay = menu.to_dict()

        Kart = {
           'id':final["id"],
           "name": final['name'],
           "photo_url": final["photo_url"],
           "price": final["price"],
           "quantity": theguy["quantity"],
           "restaurant": jay['restaurant_id'],
           "cartId" : wholeCart["id"]
        }

        theFullList.append(Kart)

    return theFullList






@cart_route.route('/items/<int:id>',methods=['PUT'])
def updateCart(id):

   item = CartItem.query.get(id)
   data = request.get_json()
   print(data,'we are getting data')
   if data:
      item.quantity = data.get('quantity',item.quantity)
      db.session.commit()
      return fullCart()


@cart_route.route('/items/<int:id>',methods=['DELETE'])
def removeItems(id):
   item=CartItem.query.get(id)
   db.session.delete(item)
   db.session.commit()
   return fullCart()



@cart_route.route('/items/<int:id>',methods=['POST'])
def addToCart(id):
  userId = current_user.to_dict()['id']
  theItem = MenuItem.query.get(id)
  newitem = theItem.to_dict()
  findme = Cart.query.filter(Cart.purchased == False).first()
  print(findme,'///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////')
  print(current_user,'this is the menu im checkouttttttt')
  if findme == None:
     print('this')
     menu = Menu.query.get(newitem['menu_id'])
     jay = menu.to_dict()['restaurant_id']
     newCart = Cart(user_id=userId,restaurant_id=jay,purchased=False)
     db.session.add(newCart)
     db.session.commit()

     cart_id = newCart.to_dict()['id']
     newGuy = CartItem(cart_id = cart_id,menu_item_id=newitem['id'],quantity=1)
     db.session.add(newGuy)
     db.session.commit()

     return fullCart()


  if findme:
    thisGuy = findme.id

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


  newGuy = CartItem(cart_id = thisGuy,menu_item_id=newitem['id'],quantity=1)
  db.session.add(newGuy)
  db.session.commit()

  return fullCart()



@cart_route.route('/<int:id>',methods=['DELETE'])
def delCart(id):
   cart = Cart.query.get(id)
   db.session.delete(cart)
   db.session.commit()
   return fullCart()
