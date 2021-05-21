from flask import Blueprint
from flask_restful import Api

from resources import Learning_historyResource

LEARNER_BLUEPRINT = Blueprint("learner", __name__)
Api(LEARNER_BLUEPRINT).add_resource(
    Learning_historyResource, "/learner/<int:id>"
)
