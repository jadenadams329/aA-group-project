from flask import Blueprint

checkout = Blueprint('checkout',__name__)


@checkout.route('')
def checkoutPage():
    return '<h1>test</h1>'
