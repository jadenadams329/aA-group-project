from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username="Demo",
        email="demo@aa.io",
        password="password",
        first_name="Demo",
        last_name="User",
        phone_number=1234567890,
        address="123 Fake St",
        city="San Diego",
        state="California",
        zip_code=92084,
        credit=150,
        profile_photo="img.url",
    )
    marnie = User(
        username="marnie",
        email="marnie@aa.io",
        password="password",
        first_name="Marnie",
        last_name="User",
        phone_number=1234567890,
        address="321 Fake St",
        city="San Diego",
        state="California",
        zip_code=92084,
        credit=200,
        profile_photo="img.url",
    )
    bobbie = User(
        username="bobbie",
        email="bobbie@aa.io",
        password="password",
        first_name="Bobbie",
        last_name="User",
        phone_number=1234567890,
        address="456 Fake St",
        city="San Diego",
        state="California",
        zip_code=92084,
        credit=550,
        profile_photo="img.url",
    )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
    db.session.commit()
