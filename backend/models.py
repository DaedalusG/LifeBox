from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship, backref

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    # hashed_password = db.Column(db.Binary(100), nullable=False)
    # root_interlocutor = db.Column(db.Boolean, nullable=False)
    profile_pic = db.Column(db.String)

    # likes = db.relationship("Like", backref="user")

    def to_safe_object(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "profile_pic": self.profile_pic,
        }
