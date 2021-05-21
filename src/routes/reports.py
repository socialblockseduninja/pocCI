from flask import Blueprint
from flask_restful import Api

from resources import Reports_Resource

REPORTS_BLUEPRINT = Blueprint("report", __name__)
Api(REPORTS_BLUEPRINT).add_resource(
    Reports_Resource, "/report"
)
