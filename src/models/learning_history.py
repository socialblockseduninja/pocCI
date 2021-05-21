"""
Define the learning_history model
"""
from . import db
from .abc import BaseModel, MetaBaseModel


class Learning_history(db.Model, BaseModel, metaclass=MetaBaseModel):
    """ The learning_history model """

    __tablename__ = "learning_history"
    studentid = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String(300), nullable=True)
    age = db.Column(db.Integer, nullable=True)
    learninghours = db.Column(db.Integer, nullable=True)
    cpuusage = db.Column(db.Integer, nullable=True)
    cost = db.Column(db.Integer, nullable=True)
    courseid = db.Column(db.String(300), nullable=True)
    noofmoudles = db.Column(db.Integer, nullable=True)
    maxnoofsubmission = db.Column(db.Integer, nullable=True)
    batchid = db.Column(db.String(300), nullable=True)

    def __init__(self):
        """ Create a new data for learning_history table """
        pass
