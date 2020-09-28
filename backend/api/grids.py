from flask import Blueprint, request, jsonify
from backend.models import db, User

grids = Blueprint('grids', __name__)


@grids.route('/save', methods=['GET', 'POST'])
def save():
    data = request.get_json()
    print(data)
    # try:
    #     name = data['name']
    #     grid = data['grid']

    #     print(data)
    return jsonify(message='hit route')
