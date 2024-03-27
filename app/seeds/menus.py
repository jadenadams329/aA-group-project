from app.models import db, environment, SCHEMA, Menu
from sqlalchemy.sql import text


def seed_menus():
    menu1 = Menu(name="Breakfast", restaurant_id=1)
    menu2 = Menu(name="Lunch", restaurant_id=1)
    menu3 = Menu(name="Dinner", restaurant_id=1)
    menu4 = Menu(name="Beverages", restaurant_id=1)
    menu5 = Menu(name="Breakfast", restaurant_id=2)
    menu6 = Menu(name="Lunch", restaurant_id=2)
    menu7 = Menu(name="Dinner", restaurant_id=2)
    menu8 = Menu(name="Beverages", restaurant_id=2)
    menu9 = Menu(name="Breakfast", restaurant_id=3)
    menu10 = Menu(name="Lunch", restaurant_id=3)
    menu11 = Menu(name="Dinner", restaurant_id=3)
    menu12 = Menu(name="Beverages", restaurant_id=3)
    menu13 = Menu(name="Breakfast", restaurant_id=4)
    menu14 = Menu(name="Lunch", restaurant_id=4)
    menu15 = Menu(name="Dinner", restaurant_id=4)
    menu16 = Menu(name="Beverages", restaurant_id=4)

    menus = [menu1, menu2, menu3, menu4, menu5, menu6, menu7, menu8, menu9, menu10, menu11, menu12, menu13, menu14, menu15, menu16]

    for menu in menus:
        db.session.add(menu)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_menus():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.menus RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM menus"))
    db.session.commit()
