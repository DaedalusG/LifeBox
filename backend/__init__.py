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
from backend.api.user_routes import user_routes
from backend.config import Config
from flask_login import LoginManager
from flask_jwt_extended import (
    JWTManager,
    jwt_required,
    get_jwt_identity,
    get_raw_jwt,
    verify_jwt_in_request)  # noqa

app = Flask(__name__, static_url_path='')
app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
db.init_app(app)
jwt = JWTManager(app)
Migrate(app, db)

# Application Security
CORS(app)


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


@app.route('/')
def slash():
    return jsonify(Notice='Please use /api route to access the api'), 200


@app.route('/api', methods=['GET'])
def api():
    return jsonify(message='Successful API ping'), 200
