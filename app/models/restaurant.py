from .db import db, SCHEMA, environment

class Restaurant(db.Model):
    __tablename__ = 'restaurants'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False, unique=True)
    logo = db.Column(db.String)
    address = db.Column(db.String, nullable=False)
    city = db.Column(db.String, nullable=False)
    state = db.Column(db.String, nullable=False)
    zip_code = db.Column(db.Integer, nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    user = db.relationship('User', back_populates='restaurants')
    menus = db.relationship('Menu', back_populates='restaurants', cascade='all, delete')
    carts = db.relationship('Cart', back_populates='restaurants', cascade='all, delete')
