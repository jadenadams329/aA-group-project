from .db import db, environment, SCHEMA
from sqlalchemy.orm import relationship
from sqlalchemy.schema import ForeignKey

class Menu(db.Model):
    __tablename__ = 'menus'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    restaurant_id = db.Column(db.Integer, ForeignKey("restaurants.id"), nullable=False)

    # Relationships
    menu_items = relationship("MenuItem", back_populates="menu", cascade='all, delete')
    restaurant = relationship("Restaurant", back_populates="menus")
