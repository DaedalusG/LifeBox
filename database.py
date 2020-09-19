from backend.models import User
from backend import app, db
from dotenv import load_dotenv
from backend.api.auth import set_password
load_dotenv()

hash = set_password('password')

with app.app_context():
    db.drop_all()
    db.create_all()

    metal_fingers = User(
        username='metal_fingers',
        email='cutz@lair.io',
        hashed_password=hash,  # noqa
    )
    ultron = User(
        username='ultron',
        email='robo-rights@lair.io',
        hashed_password=hash,  # noqa
    )
    ElizabethII = User(
        username='ElizabethII',
        email='lizzy@england.io',
        hashed_password=hash,  # noqa
    )
    xenomorph = User(
        username='xenomorph',
        email='queen@corp.com',
        hashed_password=hash,  # noqa
    )
    IggyPop = User(
        username='Iggy',
        email='Iggy@england.io',
        hashed_password=hash,  # noqa
    )
    predator = User(
        username='ThePredator',
        email='@corp.com',
        hashed_password=hash,  # noqa
    )
    Arnold = User(
        username='Arnold',
        email='arnold@corp.com',
        hashed_password=hash,  # noqa
    )

    db.session.add(metal_fingers)
    db.session.add(ultron)
    db.session.add(ElizabethII)
    db.session.add(xenomorph)
    db.session.add(IggyPop)
    db.session.add(predator)
    db.session.add(Arnold)

    db.session.commit()
