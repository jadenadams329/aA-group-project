from flask import Blueprint
from app.models.Cart import Cart
from .cart_routes import fullCart

checkout = Blueprint('checkout',__name__)


@checkout.route('',methods=['GET','POST'])
def checkoutPage():
    cart = fullCart()
    return cart
