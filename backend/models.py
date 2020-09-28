from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship, backref
from sqlalchemy.dialects.postgresql import JSON

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.Binary(100), nullable=False)
    profile_pic = db.Column(db.String)

    grids = db.relationship("Grid", backref="user")

    def to_safe_object(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "profile_pic": self.profile_pic,
        }


class Grid(db.Model):
    __tablename__ = 'grids'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(40), nullable=False, unique=True)
    grid_json = db.Column(db.JSON, nullable=False)


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)  # noqa
    grid_id = db.Column(db.Integer, db.ForeignKey("grids.id"), nullable=False)  # noqa
    content = db.Column(db.Text, nullable=False)

    users = db.relationship('User', backref='comment')

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "grid_id": self.grid_id,
            "content": self.content,
        }
