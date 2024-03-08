from app.models import db,environment,SCHEMA
from app.models.cart_items import CartItem
from sqlalchemy.sql import text

def seed_cart_items():
    item1 = CartItem(
        cart_id= 1,
        menu_item_id= 1,
        quantity = 2
    )

    item2 = CartItem(
        cart_id= 1,
        menu_item_id= 2,
        quantity = 5
    )

    item3 = CartItem(
        cart_id= 1,
        menu_item_id= 3,
        quantity = 1
    )

    item4 = CartItem(
        cart_id= 1,
        menu_item_id= 4,
        quantity = 2
    )

    item5 = CartItem(
        cart_id= 1,
        menu_item_id= 5,
        quantity =2
    )

    db.session.add(item1)
    db.session.add(item2)
    db.session.add(item3)
    db.session.add(item4)
    db.session.add(item5)

    db.session.commit()

def undo_cart_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cart_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM cart_items"))
    db.session.commit()
