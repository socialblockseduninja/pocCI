"""
Define the REST verbs relative to the learning history
"""

from flasgger import swag_from
from flask.json import jsonify
from flask import render_template,make_response
from flask_restful import Resource
from flask_restful.reqparse import Argument

from util import parse_params


class Reports_Resource(Resource):
    """ Verbs relative to the learning history """

    @staticmethod
    def get():
        """ Return an learner key information based on his id """
        headers = {'Content-Type': 'text/html'}
        return make_response(render_template('admin_dashboard.html'),200,headers)
