from .db import db,SCHEMA,environment
from sqlalchemy.schema import Column,ForeignKey
from sqlalchemy.types import Integer,Boolean,Date
from sqlalchemy.orm import relationship

class Cart(db.Model):
    __tablename__ = 'carts'

    id=Column(Integer,primary_key=True)
    user_id=Column(Integer,ForeignKey=("users.id"),nullable=False)
    restaurant_id=Column(Integer,ForeignKey=("restaurants.id"),nullable=True)
    purchased=Column(Boolean,default=False)
    created_at=Column(Date)
    last_updated_at=Column(Date)

    cartitems = relationship("CartItem", back_populates="cart")
    user=relationship("User", back_populates="carts")
    restaurant= relationship("Restaurant", back_populates="carts")
