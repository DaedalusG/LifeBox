from flask import Blueprint, request, jsonify
from backend.models import db, Grid

grids = Blueprint('grids', __name__)


@grids.route('/save', methods=['POST'])
def save():
    data = request.get_json()
    print('data------->', data)

    name = data['name']
    grid = data['grid']

    test = Grid(
        user_id=1,
        name=name,
        grid={"name": "test", "grid": [0, 1, 0]}
    )

    db.session.add(test)
    db.session.commit()

    return jsonify(message='added grid to db'), 200
