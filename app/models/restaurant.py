from .db import db, SCHEMA, environment, add_prefix_for_prod


class Restaurant(db.Model):
    __tablename__ = "restaurants"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False, unique=True)
    logo = db.Column(db.String)
    address = db.Column(db.String, nullable=False)
    city = db.Column(db.String, nullable=False)
    state = db.Column(db.String, nullable=False)
    zip_code = db.Column(db.Integer, nullable=False)
    owner_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id"), ondelete="CASCADE")
    )

    user = db.relationship("User", back_populates="restaurants")
    menus = db.relationship("Menu", back_populates="restaurant", cascade="all, delete")
    carts = db.relationship("Cart", back_populates="restaurant", cascade="all, delete")
    reviews = db.relationship(
        "Review", back_populates="restaurant", cascade="all, delete"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "logo": self.logo,
            "address": self.address,
            "city": self.city,
            "state": self.state,
            "zip_code": self.zip_code,
            "owner_id": self.owner_id,
        }
