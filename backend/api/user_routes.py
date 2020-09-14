from flask import Blueprint, jsonify
from backend.models import User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
def index():
    print('hit the route')
    return "test success"
