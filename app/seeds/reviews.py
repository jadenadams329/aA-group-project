from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reviews():
    review1 = Review(
        user_id=1,
        restaurant_id=2,
        stars=5,
        review='hidden gem'
    )
    review2 = Review(
        user_id=1,
        restaurant_id=3,
        stars=4,
        review='Finger Lickin Good'
    )
    review3 = Review(
        user_id=2,
        restaurant_id=1,
        stars=2,
        review='Taste Real Bad'
    )
    review4 = Review(
        user_id=2,
        restaurant_id=3,
        stars=3,
        review='It was okay'
    )
    review5 = Review(
        user_id=3,
        restaurant_id=1,
        stars=5,
        review='Definitely will come again!'
    )
    review6 = Review(
        user_id=3,
        restaurant_id=2,
        stars=4,
        review='Definitely will come again!'
    )

    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.add(review5)
    db.session.add(review6)
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))
    db.session.commit()
