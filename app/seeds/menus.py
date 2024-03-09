from app.models import db, environment, SCHEMA, Menu
from sqlalchemy.sql import text


def seed_menus():
    breakfast = Menu(name="Breakfast", restaurant_id=1)
    db.session.add(breakfast)
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
