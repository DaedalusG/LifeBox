from flask import Blueprint, request, jsonify
from backend.models import db, User

grids = Blueprint('grids', __name__)


@grids.route('/save', methods=['POST'])
def save():
    data = request.get_json()
    print('data------->', data)

    name = data['name']
    grid = data['grid']

    return jsonify(name=name, grid=grid), 200
