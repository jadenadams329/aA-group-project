from app.models import db,environment,SCHEMA
from app.models.cart import Cart
from sqlalchemy.sql import text


def seed_cart():
    newCart = Cart(
        user_id=1,
        restaurant_id=1,
        purchased=False
    )
    db.session.add(newCart)
    db.session.commit()



def undo_cart():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.carts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM carts"))
    db.session.commit()
