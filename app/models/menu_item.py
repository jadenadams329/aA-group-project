from .db import db, environment, SCHEMA
from sqlalchemy.orm import relationship
from sqlalchemy.schema import ForeignKey

class MenuItem(db.Model):
    __tablename__ = 'menu_items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    price = db.Column(db.Float, nullable=False, default=0.0)
    description = db.Column(db.String(500), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    photo_url = db.Column(db.String(1000))
    menu_id = db.Column(db.Integer, ForeignKey("menus.id"), nullable=False)

    # Relationships
    menu = relationship("Menu", back_populates="menu_items")
    cart_item = relationship("CartItem", uselist=False, back_populates="menu_item")
