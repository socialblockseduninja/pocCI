from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from .user import User
from .learning_history import Learning_history
