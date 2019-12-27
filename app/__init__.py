# third party imports
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_migrate import Migrate
from flask_bootstrap import Bootstrap
from flask_cors import CORS
from flask_httpauth import HTTPBasicAuth
from flask_jwt_extended import JWTManager

# local imports
from config import app_config

# db variable initialization
db = SQLAlchemy()
http_auth = HTTPBasicAuth()
login_manager = LoginManager()
jwt = JWTManager()
migrate = Migrate(compare_type=True)


def create_app(config_name):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object(app_config[config_name])
    app.config.from_pyfile('config.py')
    db.init_app(app)
    CORS(app)
    jwt.init_app(app)

    login_manager.init_app(app)
    login_manager.login_message = "You must be logged in to access this page"
    login_manager.login_view = "auth.login"

    migrate.init_app(app, db)
    Bootstrap(app)

    from app import models

    from .admin import admin as admin_blueprint
    app.register_blueprint(admin_blueprint, url_prefix='/admin')

    from .auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint)

    from .home import home as home_blueprint
    app.register_blueprint(home_blueprint)

    from .inventory import inventory as inventory_blueprint
    app.register_blueprint(inventory_blueprint)

    from .loctite import loctite as loctite_blueprint
    app.register_blueprint(loctite_blueprint)

    from .warehouse import warehouse as warehouse_blueprint
    app.register_blueprint(warehouse_blueprint)

    from .category import category as category_blueprint
    app.register_blueprint(category_blueprint)

    from .todolist import todolist as todolist_blueprint
    app.register_blueprint(todolist_blueprint)

    return app
