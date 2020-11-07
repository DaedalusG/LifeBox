from flask import Blueprint, request, jsonify
from sqlalchemy.orm import joinedload
from flask_jwt_extended import JWTManager, jwt_required
from backend.models import db, Grid, User, Comment

comments = Blueprint('comments', __name__)


@comments.route('/owner_info', methods=['POST'])
@jwt_required
def info():
    req_json = request.get_json()
    # print('req_json --------->', req_json)
    match = User.query.get(req_json["id"])
    match_dict = match.to_safe_object()
    return jsonify(owner=match_dict), 200


@comments.route('/new', methods=['POST'])
@jwt_required
def new():
    data = request.get_json()
    print('data --------->', data)

    newComment = Comment(
        user_id=data["user_id"],
        grid_id=data["grid_id"],
        content=data["content"]
    )

    db.session.add(newComment)
    db.session.commit()

    return jsonify(message='added comment to db'), 200


@comments.route('/grid_comments', methods=['POST'])
@jwt_required
def getComments():
    data = request.get_json()
    print('data --------->', data)

    comments_data = []
    comments = Comment.query.filter(Comment.grid_id == data["id"]).all()
    for comment in comments:
        user_info = User.query.filter(User.id == comment.user_id).one()

        comment_props = {}

        comment_props["username"] = user_info.username
        comment_props["profile_pic"] = user_info.profile_pic
        comment_props["content"] = comment.content

        comments_data.append(comment_props)

    print(comments_data)

    return jsonify(message='grabbed comments', comments=comments_data), 200
