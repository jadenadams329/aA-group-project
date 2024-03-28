from .db import db,SCHEMA,environment, add_prefix_for_prod
from sqlalchemy.schema import ForeignKey
from sqlalchemy.orm import relationship

class Cart(db.Model):
    __tablename__ = "carts"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id=db.Column(db.Integer,primary_key=True)
    user_id=db.Column(db.Integer,ForeignKey(add_prefix_for_prod("users.id")),nullable=False)
    restaurant_id=db.Column(db.Integer,ForeignKey(add_prefix_for_prod("restaurants.id")),nullable=True)
    purchased=db.Column(db.Boolean,default=False)

    cart_items = relationship("CartItem", back_populates="cart", cascade="all, delete")
    user = relationship("User", back_populates="carts")
    restaurant = relationship("Restaurant", back_populates="carts")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "restaurant_id": self.restaurant_id,
            "purchased" : self.purchased
    }
