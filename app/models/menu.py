from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from sqlalchemy.schema import ForeignKey

class Menu(db.Model):
    __tablename__ = 'menus'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    restaurant_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("restaurants.id"), ondelete='CASCADE'), nullable=False)

    # Relationships
    menu_items = relationship("MenuItem", back_populates="menu", cascade='all, delete')
    restaurant = relationship("Restaurant", back_populates="menus")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'restaurant_id': self.restaurant_id,
            'menu_items': self.menu_items
        }
