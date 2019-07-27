from flask import Blueprint

loctite = Blueprint('loctite', __name__)

from . import views