from .db import db,SCHEMA,environment, add_prefix_for_prod
from sqlalchemy.schema import Column,ForeignKey
from sqlalchemy.types import Integer
from sqlalchemy.orm import relationship


class CartItem(db.Model):
    __tablename__='cart_items'

    if environment == "production":
     __table_args__ = {'schema': SCHEMA}


    id=Column(Integer,primary_key=True)
    cart_id=Column(Integer,ForeignKey(add_prefix_for_prod("carts.id")),nullable=False)
    menu_item_id=Column(Integer,ForeignKey(add_prefix_for_prod("menu_items.id")),nullable=False)
    quantity=Column(Integer,default=1)

    cart = relationship("Cart",back_populates="cart_items")
    menu_item = relationship("MenuItem", back_populates="cart_item",uselist=False)
