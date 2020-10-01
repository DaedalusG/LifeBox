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

    newGrid = Grid(
        user_id=user_id,
        name=name,
        grid_json=grid
    )

    db.session.add(newGrid)
    db.session.commit()

    return jsonify(message='added grid to db'), 200


@grids.route('/load', methods=['POST'])
@jwt_required
def load():
    req_json = request.get_json()
    print('name------->', req_json["name"])

    matches = Grid.query.filter(Grid.name.ilike(f'%{req_json["name"]}%'))
    grids = matches.all()
    grid_dict = [grid.to_dict() for grid in grids]
    print('hit load route', req_json)
    print('matches----->', grid_dict)
    return jsonify(message=req_json, grids=grid_dict), 200
