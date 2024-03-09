from .db import db, environment, SCHEMA

class Review(db.Model):
    __tablename__ = "reviews"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id",ondelete='CASCADE'))
    restaurant_id = db.Column(db.Integer, db.ForeignKey("restaurants.id",ondelete='CASCADE'))
    stars = db.Column(db.Integer, nullable=False)
    review = db.Column(db.String, nullable=False)

    user = db.relationship('User', back_populates='reviews')
    restaurant = db.relationship('Restaurant', back_populates='reviews')
