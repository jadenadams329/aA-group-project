from .db import db,SCHEMA,environment, add_prefix_for_prod
from sqlalchemy.schema import Column,ForeignKey
from sqlalchemy.types import Integer,Boolean,Date
from sqlalchemy.orm import relationship

class Cart(db.Model):
    __tablename__ = "carts"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id=Column(Integer,primary_key=True)
    user_id=Column(Integer,ForeignKey(add_prefix_for_prod("users.id")),nullable=False)
    restaurant_id=Column(Integer,ForeignKey(add_prefix_for_prod("restaurants.id")),nullable=True)
    purchased=Column(Boolean,default=False)

    cart_items = relationship("CartItem", back_populates="cart", cascade="all, delete")
    user = relationship("User", back_populates="carts")
    restaurant = relationship("Restaurant", back_populates="carts")
