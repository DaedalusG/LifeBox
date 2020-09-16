from backend.models import User
from backend import app, db
from dotenv import load_dotenv
load_dotenv()


with app.app_context():
    db.drop_all()
    db.create_all()

    ian = User(
        username='Ian',
        email='ian@aa.io',
    )
    javier = User(
        username='Javier',
        email='javier@aa.io',
    )
    dean = User(
        username='Dean',
        email='dean@aa.io',
    )
    metal_fingers = User(
        username='metal_fingers',
        email='cutz@lair.io',
    )
    ultron = User(
        username='ultron',
        email='robo-rights@lair.io',
    )
    ElizabethII = User(
        username='ElizabethII',
        email='lizzy@england.io',
    )
    xenomorph = User(
        username='xenomorph',
        email='queen@corp.com',
    )
    IggyPop = User(
        username='Iggy',
        email='Iggy@england.io',
    )
    predator = User(
        username='ThePredator',
        email='@corp.com',
    )
    Arnold = User(
        username='Arnold',
        email='arnold@corp.com',
    )

    db.session.add(ian)
    db.session.add(javier)
    db.session.add(dean)
    db.session.add(metal_fingers)
    db.session.add(ultron)
    db.session.add(ElizabethII)
    db.session.add(xenomorph)
    db.session.add(IggyPop)
    db.session.add(predator)
    db.session.add(Arnold)

    db.session.commit()
