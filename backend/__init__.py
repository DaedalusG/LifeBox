import os
from flask import (
    Flask,
    render_template,
    request,
    session,
    redirect,
    jsonify)
from flask_cors import CORS
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_migrate import Migrate
from backend.models import db, User
from backend.api.user import user
from backend.config import Config
from flask_login import LoginManager
from flask_jwt_extended import (
    JWTManager,
    jwt_required,
    get_jwt_identity,
    get_raw_jwt,
    verify_jwt_in_request)

from .api.auth import auth
from .api.grids import grids
from .api.comments import comments

# Setup
app = Flask(__name__, static_url_path='')
app.config.from_object(Config)
db.init_app(app)
Migrate(app, db)

# Security
CORS(app)
jwt = JWTManager(app)

# Blueprints
app.register_blueprint(user, url_prefix='/api/users')
app.register_blueprint(grids, url_prefix='/api/grids')
app.register_blueprint(auth, url_prefix='/api/auth')
app.register_blueprint(comments, url_prefix='/api/comments')


@app.after_request
def inject_csrf_token(response):
    response.set_cookie('csrf_token',
                        generate_csrf(),
                        secure=True if os.environ.get('FLASK_ENV') else False,
                        samesite='Strict' if os.environ.get(
                            'FLASK_ENV') else None,
                        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path>')
def react_root(path):
    return app.send_static_file('index.html')
