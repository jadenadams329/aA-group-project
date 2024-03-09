from app.models import db, Restaurant, environment, SCHEMA
from sqlalchemy.sql import text


def seed_restaurants():
    #1
    TheLoopBrewingCo = Restaurant(
        name='The Loop Brewing Co',
        logo='https://loopbrewingcompany.com/wp-content/uploads/2023/11/LoopBrewingCompany.png',
        address='404 W A st',
        city='McCook',
        state='Nebraska',
        zip_code=69001,
        owner_id=1
    )
    #2
    AppleBee = Restaurant(
        name='Applebee`s Bar and Grill',
        logo='https://assets.restaurants.applebees.com/images/logo__full-logo__color.svg?iar=0&hash=4FE124FB9586F5159DF7A6635E130997',
        address='5605 2nd Ave',
        city='Kearney',
        state='Nebraska',
        zip_code= 68847,
        owner_id=2
    )
    #3
    ElPuerto = Restaurant(
        name='El Puerto',
        logo='https://scontent-den2-1.xx.fbcdn.net/v/t39.30808-1/298766776_581075440381423_8748120028866658599_n.jpg?stp=cp0_dst-jpg_e15_p120x120_q65&_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=W4kP-jvfyLMAX8Yrv2g&_nc_ht=scontent-den2-1.xx&oh=00_AfCjLnMfiHIXNQLRs3Dl3XuMcbNfwezcDVz8Hopem9imVQ&oe=65EEF5BF',
        address='311 Norris Ave',
        city='McCook',
        state='Nebraska',
        zip_code=69001,
        owner_id=3
    )


    db.session.add(TheLoopBrewingCo)
    db.session.add(AppleBee)
    db.session.add(ElPuerto)
    db.session.commit()


def undo_restaurants():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.restaurants RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM restaurants"))
    db.session.commit()
