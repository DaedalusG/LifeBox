from flask import Blueprint, request, jsonify
from flask_jwt_extended import JWTManager, create_access_token
import bcrypt

from models import db, User

auth = Blueprint('auth', __name__)


def set_password(password):
    hashed_password = bcrypt.hashpw(
        password.encode('utf-8'), bcrypt.gensalt())
    return hashed_password


def verify_password(password, hashed_password):
    # Return value could be made more sophisticated
    if bcrypt.checkpw(password.encode('utf-8'), hashed_password):
        return True
    else:
        return False


def login():
    data = request.get_json()

    try:
        email = data['email']
        password = data['password']
        print("++++++++++++++++++++", email, password)
        if not email:
            return jsonify(message='Email Required'), 400
        elif not password:
            return jsonify(message='Password Required'), 400

        user = User.query.filter_by(email=email).first()
        if not user:
            return jsonify(message='Email Required'), 400

        print('+++++++++++++++++', user, user.hashed_password)
        verified = verify_password(password, user.hashed_password)

        if not verified:
            # Error needs handling decision
            return jsonify(message='Password verify failed'), 403
        else:
            auth_token = create_access_token(identity={"email": user.email})
        return jsonify(auth_token=auth_token), 200

    except Exception:
        return jsonify(message='Login Failed'), 408
