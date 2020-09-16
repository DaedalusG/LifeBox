from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from backend.models import User, db

user = Blueprint('user', __name__)


@user.route('/')
# @jwt_required
def all_users():
    res = User.query.all()
    return jsonify({"users": [user.to_safe_object() for user in res]})


@user.route('/token', methods=['GET'])
@jwt_required
def api():
    user = get_jwt_identity()
    current_user = User.query.filter_by(username=user['username']).first()
    safe_user = current_user.to_safe_object()
    return jsonify(safe_user), 200
