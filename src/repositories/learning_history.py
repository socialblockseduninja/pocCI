""" Defines the learning history repository """
import json
from models import Learning_history
from flask import jsonify


class Learning_historyRepository:
    """ The repository for the learning history"""

    @staticmethod
    def get(id):
        """ Query a user by id"""
        l=[]
        learners = Learning_history.query.all()
        for learner in learners:
            print(learner)
            temp= dict(studentid=learner.studentid,date=learner.date,age=learner.age,learninghours=learner.learninghours,cpuusage=learner.cpuusage,cost=learner.cost,courseid=learner.courseid,noofmoudles=learner.noofmoudles,maxnoofsubmission=learner.maxnoofsubmission,batchid=learner.batchid)
            print(temp)
            l.append(temp)
        print(l)
        return l
