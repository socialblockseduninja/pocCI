import json
import unittest

from models import Learning_history
from models.abc import db
from repositories import Learning_historyRepository
from server import server


class TestUser(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.client = server.test_client()

    def setUp(self):
#        db.create_all()

    def tearDown(self):
#        db.session.remove()
#        db.drop_all()

    def test_get(self):
        """ The GET on `/learner` should return an user """
        response = self.client.get("/application/learner/123")

        self.assertEqual(response.status_code, 200)
        response_json = json.loads(response.data.decode("utf-8"))
        self.assertEqual(
            response_json,
            {"user": {"age": 25, "first_name": "John", "last_name": "Doe"}},
        )

