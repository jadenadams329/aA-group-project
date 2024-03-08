from .db import db,SCHEMA,environment
from sqlalchemy.schema import Column,ForeignKey
from sqlalchemy.types import Integer
from sqlalchemy.orm import relationship


class CartItem(db.Model):
    __tablename__='cartitems'

    if environment == "production":
     __table_args__ = {'schema': SCHEMA}


    id=Column(Integer,primary_key=True)
    cart_id=Column(Integer,ForeignKey("cart_id"),nullable=False)
    menu_item_id=Column(Integer,ForeignKey("menuItems_id"),nullable=False)
    quantity=Column(Integer,default=1)

    cart = relationship("Cart",back_populates="cartitems")
    menu_item = relationship("MenuItem", back_populates="cart_item",uselist=False)
