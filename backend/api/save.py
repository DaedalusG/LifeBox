from flask import Blueprint, request, jsonify
from backend.models import db, User

save = Blueprint('save', __name__)


@save.route('/saving', methods=['GET, POST'])
def saving():
    data = request.get_json()

    # try:
    #     name = data['name']
    #     grid = data['grid']

    #     print(data)
    return jsonify(message='hit route')
