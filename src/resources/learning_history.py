"""
Define the REST verbs relative to the learning history
"""

from flasgger import swag_from
from flask.json import jsonify
from flask_restful import Resource
from flask_restful.reqparse import Argument

from repositories import Learning_historyRepository
from util import parse_params


class Learning_historyResource(Resource):
    """ Verbs relative to the learning history """

    @staticmethod
    def get(id):
        """ Return an learner key information based on his id """
        print('inside resource')
        learner = Learning_historyRepository.get(id=id)
        return jsonify(learner)
