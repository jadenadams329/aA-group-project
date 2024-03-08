from app.models import db, environment, SCHEMA, MenuItem
from sqlalchemy.sql import text


def seed_menu_items():
    item_one = MenuItem(
        name="Moons Over My Hammy",
        price=17.77,
        description="Ham and scrambled egg sandwich with Swiss & American cheeses on grilled artisan bread. Served with hash browns.",
        category="Breakfast",
        photo_url="https://www.dennys.ca/wp-content/uploads/2019/10/moons-over-my-hammy_thumb-l.jpg",
        menu_id=1,
    )
    item_two = MenuItem(
        name="Classic Pancakes",
        price=9.99,
        description="Fluffy buttermilk pancakes served with maple syrup and a pat of butter.",
        category="Breakfast",
        photo_url="https://handletheheat.com/wp-content/uploads/2019/02/The-Best-Pancake-Recipe-SQUARE-500x375.jpg",
        menu_id=1,
    )
    item_three = MenuItem(
        name="Avocado Toast",
        price=12.50,
        description="Sliced avocado on whole-grain toast, topped with cherry tomatoes, red pepper flakes, and a drizzle of olive oil.",
        category="Breakfast",
        photo_url="https://www.thekitchenwhisperer.net/wp-content/uploads/2020/03/Caprese-Avocado-Toast-7.jpg",
        menu_id=1,
    )
    item_four = MenuItem(
        name="Greek Yogurt Parfait",
        price=6.75,
        description="Layers of Greek yogurt, granola, fresh berries, and honey.",
        category="Breakfast",
        photo_url="https://thefoodiephysician.com/wp-content/uploads/2019/02/Greek-Yogurt-Berry-Parfaits-1.jpg",
        menu_id=1,
    )
    item_five = MenuItem(
        name="Eggs Benedict",
        price=14.99,
        description="Poached eggs on English muffins with Canadian bacon, hollandaise sauce, and a sprinkle of chives.",
        category="Breakfast",
        photo_url="https://thewoodenskillet.com/wp-content/uploads/2023/05/how-to-make-eggs-benedict-1.jpg",
        menu_id=1,
    )
    db.session.add_all([item_one, item_two, item_three, item_four, item_five])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_menu_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
    db.session.commit()
