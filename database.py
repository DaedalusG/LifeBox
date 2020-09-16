from backend.models import User
from backend import app, db
from dotenv import load_dotenv
load_dotenv()

password_digest: BCrypt: : Password.create('Your_Password'))

with app.app_context():
    db.drop_all()
    db.create_all()

    ian=User(
        username = 'Ian',
        email = 'ian@aa.io',
        hashed_password = password_digest: BCrypt: : Password.create('Your_Password')),  # noqa
    )
    javier=User(
        username='Javier',
        email='javier@aa.io',
        hashed_password=$2b$12$vu6DPbq4MzCBwvlqjPiy1Oq0huYhoxlRWx5ipZ1AvEo8McV.QD1KC,  # noqa
    )
    dean=User(
        username='Dean',
        email='dean@aa.io',
        hashed_password=$2b$12$vu6DPbq4MzCBwvlqjPiy1Oq0huYhoxlRWx5ipZ1AvEo8McV.QD1KC,  # noqa
    )
    metal_fingers=User(
        username='metal_fingers',
        email='cutz@lair.io',
        hashed_password=$2b$12$vu6DPbq4MzCBwvlqjPiy1Oq0huYhoxlRWx5ipZ1AvEo8McV.QD1KC,  # noqa
    )
    ultron=User(
        username='ultron',
        email='robo-rights@lair.io',
        hashed_password=$2b$12$vu6DPbq4MzCBwvlqjPiy1Oq0huYhoxlRWx5ipZ1AvEo8McV.QD1KC,  # noqa
    )
    ElizabethII=User(
        username='ElizabethII',
        email='lizzy@england.io',
        hashed_password=$2b$12$vu6DPbq4MzCBwvlqjPiy1Oq0huYhoxlRWx5ipZ1AvEo8McV.QD1KC,  # noqa
    )
    xenomorph=User(
        username='xenomorph',
        email='queen@corp.com',
        hashed_password=$2b$12$vu6DPbq4MzCBwvlqjPiy1Oq0huYhoxlRWx5ipZ1AvEo8McV.QD1KC,  # noqa
    )
    IggyPop=User(
        username='Iggy',
        email='Iggy@england.io',
        hashed_password=$2b$12$vu6DPbq4MzCBwvlqjPiy1Oq0huYhoxlRWx5ipZ1AvEo8McV.QD1KC,  # noqa
    )
    predator=User(
        username='ThePredator',
        email='@corp.com',
        hashed_password=$2b$12$vu6DPbq4MzCBwvlqjPiy1Oq0huYhoxlRWx5ipZ1AvEo8McV.QD1KC,  # noqa
    )
    Arnold=User(
        username='Arnold',
        email='arnold@corp.com',
        hashed_password=$2b$12$vu6DPbq4MzCBwvlqjPiy1Oq0huYhoxlRWx5ipZ1AvEo8McV.QD1KC,  # noqa
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
