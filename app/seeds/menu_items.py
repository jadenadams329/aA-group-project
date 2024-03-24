from app.models import db, environment, SCHEMA, MenuItem
from sqlalchemy.sql import text


def seed_menu_items():
    item1 = MenuItem(
        name="Moons Over My Hammy",
        price=17.77,
        description="Ham and scrambled egg sandwich with Swiss & American cheeses on grilled artisan bread. Served with hash browns.",
        category="PanCakes",
        photo_url="https://www.dennys.ca/wp-content/uploads/2019/10/moons-over-my-hammy_thumb-l.jpg",
        menu_id=1,
    )
    item2 = MenuItem(
        name="Classic Pancakes",
        price=9.99,
        description="Fluffy buttermilk pancakes served with maple syrup and a pat of butter.",
        category="Breakfast",
        photo_url="https://handletheheat.com/wp-content/uploads/2019/02/The-Best-Pancake-Recipe-SQUARE-500x375.jpg",
        menu_id=5,
    )
    item3 = MenuItem(
        name="Avocado Toast",
        price=12.50,
        description="Sliced avocado on whole-grain toast, topped with cherry tomatoes, red pepper flakes, and a drizzle of olive oil.",
        category="Breakfast",
        photo_url="https://www.thekitchenwhisperer.net/wp-content/uploads/2020/03/Caprese-Avocado-Toast-7.jpg",
        menu_id=10,
    )
    item4 = MenuItem(
        name="Greek Yogurt Parfait",
        price=6.75,
        description="Layers of Greek yogurt, granola, fresh berries, and honey.",
        category="Yogurt",
        photo_url="https://thefoodiephysician.com/wp-content/uploads/2019/02/Greek-Yogurt-Berry-Parfaits-1.jpg",
        menu_id=1,
    )
    item5 = MenuItem(
        name="Eggs Benedict",
        price=14.99,
        description="Poached eggs on English muffins with Canadian bacon, hollandaise sauce, and a sprinkle of chives.",
        category="Breakfast",
        photo_url="https://thewoodenskillet.com/wp-content/uploads/2023/05/how-to-make-eggs-benedict-1.jpg",
        menu_id=5,
    )
    item6 = MenuItem(
        name='Big Mac',
        price=12.99,
        description='Big Mac® is a 100 percent beef burger with a taste like no other.',
        category='Burger',
        photo_url='https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?q=80&w=2615&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        menu_id=1
    )
    item7 = MenuItem(
        name='Healthy Salad',
        price=15.99,
        description='House Buttermilk Ranch Dressing (on the side), Tri Tip Steak, Chopped Romaine Lettuce, Smoked Bacon Pieces.',
        category='Salad',
        photo_url='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        menu_id=1
    )
    item8 = MenuItem(
        name='Braised Salmon',
        price=18.99,
        description='Braised Salmon with Oyster Sauce with chopped Cucumbers',
        category='Seafood',
        photo_url='https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        menu_id=1
    )
    item9 = MenuItem(
        name='Honey Pancakes',
        price=12.99,
        description='Honey Pancakes served with fresh blueberries.',
        category='PanCakes',
        photo_url='https://images.unsplash.com/photo-1506084868230-bb9d95c24759?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        menu_id=1
    )
    item10 = MenuItem(
        name='Oreo Mocha',
        price=6.99,
        description='A delicious blend of coffee, chocolate, and Oreo cookie goodness.',
        category='Coffee',
        photo_url='https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        menu_id=4
    )
    item11 = MenuItem(
        name='Coke',
        price=2.99,
        description='A Freezing can of Coca Cola.',
        category='Soda',
        photo_url='https://images.unsplash.com/photo-1554866585-cd94860890b7?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        menu_id=4
    )
    item12 = MenuItem(
        name='Sprite',
        price=2.99,
        description='Refreshing Sprite',
        category='Soda',
        photo_url='https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        menu_id=4
    )
    item13 = MenuItem(
        name='Chicken Fried Rice',
        price=15.99,
        description='Chicken Fried Rice served with peas, corns, and carrots',
        category='Fried Rice',
        photo_url='https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        menu_id=3
    )
    item14 = MenuItem(
        name='Fresh Fried Chicken',
        price=18.99,
        description='Deep Fried Chicken Drumstick and wings, served with ranch sauce!',
        category='Chicken',
        photo_url='https://images.unsplash.com/photo-1562967916-eb82221dfb92?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        menu_id=2
    )
    item15 = MenuItem(
        name='Seafood Spaghetti',
        price=19.99,
        description='Stir Fried Seafood Spaghetti with House Special Sauce!',
        category='Spaghetti',
        photo_url='https://images.unsplash.com/photo-1603661688298-870c8958ebf8?q=80&w=2008&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        menu_id=2
    )

    db.session.add_all([item1, item2, item3, item4, item5, item6, item7, item8, item9, item10, item11, item12, item13, item14, item15])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_menu_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.menu_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM menu_items"))
    db.session.commit()
