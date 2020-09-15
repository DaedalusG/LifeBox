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
        root_interlocutor=True
    )
    javier = User(
        username='Javier',
        email='javier@aa.io',
        root_interlocutor=True
    )
    dean = User(
        username='Dean',
        email='dean@aa.io',
        root_interlocutor=True
    )
    metal_fingers = User(
        username='metal_fingers',
        email='cutz@lair.io',
        root_interlocutor=False
    )
    ultron = User(
        username='ultron',
        email='robo-rights@lair.io',
        root_interlocutor=False
    )
    ElizabethII = User(
        username='ElizabethII',
        email='lizzy@england.io',
        root_interlocutor=False
    )
    xenomorph = User(
        username='xenomorph',
        email='queen@corp.com',
        root_interlocutor=False
    )
    IggyPop = User(
        username='Iggy',
        email='Iggy@england.io',
        root_interlocutor=True
    )
    predator = User(
        username='ThePredator',
        email='@corp.com',
        root_interlocutor=False
    )
    Arnold = User(
        username='Arnold',
        email='arnold@corp.com',
        root_interlocutor=False
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
