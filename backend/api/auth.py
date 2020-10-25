from flask import Blueprint, request, jsonify
from flask_jwt_extended import JWTManager, create_access_token
import bcrypt

from backend.models import db, User

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


@auth.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    print('-------------------****------------------')
    print(data)

    try:
        username = data['username']
        password = data['password']

        if not username or not password:
            return jsonify(message='Username and password required'), 400
        # elif not password:
        #     return jsonify(message='Password Required'), 400

        user = User.query.filter_by(username=username).first()
        if not user:
            return jsonify(message='Username not found'), 400

        verified = verify_password(password, user.hashed_password)

        if not verified:
            # Error needs handling decision
            return jsonify(message='Password verify failed'), 403
        else:
            auth_token = create_access_token(
                identity={"username": user.username})
        return jsonify(auth_token=auth_token), 200

    except Exception:
        return jsonify(message='Login failed'), 408


@auth.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()

    try:
        username = data['username']
        email = data['email']
        profile_pic = data['profile_pic']

        if not username:
            return jsonify(message="Username required"), 400
        elif not email:
            return jsonify(message='Email required'), 400
        elif not (data['password'] == data['rePassword']):
            return jsonify(message="Passwords must match"), 400

        if not profile_pic:
            return jsonify(message="error in profile pic upload")

        try:
            hashed_password = set_password(data['password'])
        except Exception:
            return jsonify(message='Password required'), 400

        user = User(
            username=username,
            email=email,
            hashed_password=hashed_password,
            profile_pic=profile_pic
        )
        db.session.add(user)
        db.session.commit()

        auth_token = create_access_token(identity={"username": user.username})
        return jsonify(auth_token=auth_token), 200

    except Exception:
        return jsonify(message="try failed"), 409
