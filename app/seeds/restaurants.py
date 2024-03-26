from app.models import db, Restaurant, environment, SCHEMA
from sqlalchemy.sql import text


def seed_restaurants():
    # 1
    TheLoopBrewingCo = Restaurant(
        name="The Loop Brewing Co",
        logo="https://media.timeout.com/images/102424801/750/422/image.jpg",
        address="404 W A st",
        city="McCook",
        state="Nebraska",
        zip_code=69001,
        owner_id=1,
    )
    # 2
    AppleBee = Restaurant(
        name="Applebee`s Bar and Grill",
        logo="https://imgix.bustle.com/uploads/image/2018/5/25/6e1413bf-5fa9-416d-820f-21d8cb6e8d4d-franki-valli-shot.jpg",
        address="5605 2nd Ave",
        city="Kearney",
        state="Nebraska",
        zip_code=68847,
        owner_id=2,
    )
    # 3
    ElPuerto = Restaurant(
        name="El Puerto",
        logo="https://offloadmedia.feverup.com/secretnyc.co/wp-content/uploads/2022/08/25090740/Maya-Tablescape-8-2100x1400-0e1bfaf5-d6f2-432a-b200-efdebde46951-1024x683.jpeg",
        address="311 Norris Ave",
        city="McCook",
        state="Nebraska",
        zip_code=69001,
        owner_id=3,
    )

    SunsetGrillBar = Restaurant(
        name="Sunset Grill & Bar",
        logo="https://cdn.vox-cdn.com/thumbor/zWR2qzAqrUUsDdrYAFiPKLnB-jQ=/0x0:2000x1315/1200x800/filters:focal(840x498:1160x818)/cdn.vox-cdn.com/uploads/chorus_image/image/72056421/sur_le_vert_3.0.jpeg",
        address="123 Ocean View Dr",
        city="Seaside",
        state="California",
        zip_code=93955,
        owner_id=1,
    )

    PastaParadise = Restaurant(
        name="Pasta Paradise",
        logo="https://insanelygoodrecipes.com/wp-content/uploads/2021/12/Spaghetti-Bolognese-with-Basil-in-a-Plate.jpg",
        address="789 Bella Vista Ave",
        city="Little Italy",
        state="New York",
        zip_code=10013,
        owner_id=2,
    )

    SushiHaven = Restaurant(
        name="Sushi Haven",
        logo="https://www.mashed.com/img/gallery/youve-been-eating-sushi-wrong-this-whole-time/intro-1654872727.jpg",
        address="456 Zen Garden Ln",
        city="Tokyo",
        state="Tokyo Prefecture",
        zip_code=10013,
        owner_id=3,
    )

    restaurant_list = [TheLoopBrewingCo, AppleBee, ElPuerto, SunsetGrillBar, PastaParadise, SushiHaven]

    # Add instances to the database
    for restaurant in restaurant_list:
        db.session.add(restaurant)

    db.session.commit()


def undo_restaurants():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.restaurants RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM restaurants"))
    db.session.commit()
