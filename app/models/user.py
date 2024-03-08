from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.orm import relationship


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    phone_number = db.Column(db.Integer, nullable=False)
    address = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(50), nullable=False)
    state = db.Column(db.String(50), nullable=False)
    zip_code = db.Column(db.Integer, nullable=False)
    credit = db.Column(db.Float, default=0.0)
    profile_photo = db.Column(db.String(1000))

    # Relationships
    reviews = relationship("Review", back_populates="user", cascade='all, delete')
    restaurants = relationship("Restaurant", back_populates="user", cascade='all, delete')
    carts = relationship("Cart", back_populates="user", cascade='all, delete')



    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'first_name': self.first_name,
            'last-name' : self.last_name,
            'phone_number': self.phone_number,
            'address': self.address,
            'city' : self.city,
            'state': self.state,
            'zip_code': self.zip_code,
            'credit': self.credit,
            'profile_photo': self.profile_photo
        }
