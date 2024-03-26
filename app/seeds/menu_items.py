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
        menu_id=2
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
        menu_id=3
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
    item16 = MenuItem(
        name='Avocado Toast',
        price=8.99,
        description='Avocado toast topped with a sunny-side-up egg.',
        category='Toast',
        photo_url='https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        menu_id=1
    )
    item17 = MenuItem(
            name='Tomato Toast',
            price=9.99,
            description='Toasted bread topped with sliced tomatoes, chopped chives, and cream',
            category='Toast',
            photo_url='https://images.unsplash.com/photo-1506280754576-f6fa8a873550?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            menu_id=1
    )
    item18 = MenuItem(
        name='Rasberry Cheesecake',
        price=11.99,
        description='Creamy cheesecake with a luscious raspberry swirl atop a crumbly graham cracker crust.',
        category='Dessert',
        photo_url='https://images.unsplash.com/photo-1621955511667-e2c316e4575d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        menu_id=3
    )
    item19 = MenuItem(
        name='Chocolate Chip Cookie',
        price=7.99,
        description='Fresh Baked Chocolate Chip Cookies topped with almonds',
        category='Dessert',
        photo_url='https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        menu_id=3
    )
    item20 = MenuItem(
        name='Butter Crossiant',
        price=7.99,
        description='Flaky, buttery pastry layers delicately folded into a crescent shape, offering a rich and indulgent treat with every bite',
        category='Bakery Items',
        photo_url='https://images.unsplash.com/photo-1530610476181-d83430b64dcd?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        menu_id=5
    )
    item21 = MenuItem(
        name='Fresh Bake Bagels',
        price=5.99,
        description='Bagels slathered with smooth, sweet cream cheese, offering a delightful blend of savory and sweet flavors in every bite',
        category='Bakery Items',
        photo_url='https://images.unsplash.com/photo-1608048608495-e062fc7d0725?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        menu_id=5
    )
    item22 = MenuItem(
        name='Breakfast Platter',
        price=15.99,
        description='A hearty platter featuring eggs, crispy bacon, savory sausage, and slices of freshly baked bread.',
        category='Combo',
        photo_url='https://images.unsplash.com/photo-1533920379810-6bedac961555?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        menu_id=5
    )
    item23 = MenuItem(
        name='Tomato Pasta',
        price=15.99,
        description='Pasta tossed in a rich tomato sauce, bursting with the flavors of ripe tomatoes, garlic, herbs.',
        category='Pasta',
        photo_url='https://images.unsplash.com/photo-1608897013039-887f21d8c804?q=80&w=2584&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        menu_id=6
    )
    item24 = MenuItem(
        name='Grilled Salmon',
        price=18.99,
        description='Grilled salmon served alongside creamy avocado slices and a fresh house salad',
        category='Seafood',
        photo_url='https://images.unsplash.com/photo-1611599537845-1c7aca0091c0?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        menu_id=6
    )
    item25 = MenuItem(
        name='Beef Tacos',
        price=12.95,
        description='Three soft corn tortillas filled with seasoned ground beef, topped with crisp lettuce, diced tomatoes, shredded cheese.',
        category='Tacos',
        photo_url='https://images.unsplash.com/photo-1588556008426-af415581d44b?q=80&w=2565&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        menu_id=6
    )
    item26 = MenuItem(
        name='Beef Rice Noodle',
        price=15.99,
        description='Savory beef slices in pork soup with tender rice noodles',
        category='Noodle',
        photo_url='https://images.unsplash.com/photo-1555126634-323283e090fa?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        menu_id=7
    )
    item27 = MenuItem(
        name='Sirloin Steak',
        price=28.99,
        description='Sirloin Steak topped with chives and fresh fried french fries.',
        category='Steak',
        photo_url='https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        menu_id=7
    )
    item28 = MenuItem(
        name='T-Bone Steak',
        price=32.99,
        description='22 oz Fresh Grilled T-Bone steak.',
        category='Steak',
        photo_url='https://images.unsplash.com/photo-1598577790111-6bb8ee8f7af9?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        menu_id=7
    )
    item29 = MenuItem(
        name='Ice Milk Tea',
        price=5.99,
        description='Refreshing milk tea infused with aromatic black tea, served over ice.',
        category='Tea',
        photo_url='https://images.unsplash.com/photo-1621221814631-e8bfdabd5ca4?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        menu_id=8
    )
    item30 = MenuItem(
        name='Ice Green Tea Latte',
        price=6.95,
        description='Chilled green tea combined with creamy milk and poured over ice',
        category='Coffee',
        photo_url='https://images.unsplash.com/photo-1592284441621-581ebd2e677d?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        menu_id=8
    )
    item31 = MenuItem(
        name='Brown Sugar Milk Tea',
        price=7.95,
        description='Milk tea with rich brown sugar syrup, served over ice for a delightful blend of sweetness and creaminess',
        category='Boba',
        photo_url='https://images.unsplash.com/photo-1599536837271-f3e08bd0fac5?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        menu_id=8
    )
    item32 = MenuItem(
        name='Cheese Corn SandWich',
        price=6.95,
        description='Sandwich featuring creamy cheese and flavorful corn kernels layered between slices of toasted bread',
        category='Sandwich',
        photo_url='https://images.unsplash.com/photo-1528736235302-52922df5c122?q=80&w=2754&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        menu_id=9
    )
    item33 = MenuItem(
        name='Cheese Burger',
        price=11.89,
        description='Cheeseburger featuring a juicy beef patty grilled to perfection, topped with melted cheese',
        category='Burger',
        photo_url='https://images.unsplash.com/photo-1605789538467-f715d58e03f9?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        menu_id=10
    )

    db.session.add_all([item1, item2, item3, item4, item5, item6, item7, item8, item9, item10, item11, item12, item13, item14, item15, item16, item17, item18, item19, item20, item21, item22, item23, item24, item25, item26, item27, item28, item29, item30, item31, item32, item33])
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
