from flask import Blueprint, request, jsonify
from flask_jwt_extended import JWTManager, jwt_required
from backend.models import db, Grid, User

comments = Blueprint('comments', __name__)


@comments.route('/owner_info', methods=['POST'])
@jwt_required
def info():
    req_json = request.get_json()
    print('req_json --------->', req_json)
    match = User.query.get(req_json["id"])
    match_dict = match.to_safe_object()
    return jsonify(owner=match_dict), 200


@comments.route('/grid', methods=['GET'])
@jwt_required
def conv():
    req_json = request.get_json()
