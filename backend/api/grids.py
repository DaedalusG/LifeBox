from flask import Blueprint, request, jsonify
from flask_jwt_extended import JWTManager, jwt_required
from backend.models import db, Grid

grids = Blueprint('grids', __name__)


@grids.route('/save', methods=['POST'])
@jwt_required
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


@grids.route('/load', methods=['GET'])
@jwt_required
def load():
    print('hit load route')
    return jsonify(message='hit load route'), 200
