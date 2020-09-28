from flask import Blueprint, request, jsonify
from backend.models import db, Grid

grids = Blueprint('grids', __name__)


@grids.route('/save', methods=['POST'])
def save():
    data = request.get_json()
    print('data------->', data)

    user_id = data['user_id']
    name = data['name']
    grid = data['grid']

    test = Grid(
        user_id=user_id,
        name=name,
        grid_json=grid
    )

    db.session.add(test)
    db.session.commit()

    return jsonify(message='added grid to db'), 200
