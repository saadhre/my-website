import unittest
from contextlib import contextmanager

from flask import template_rendered
from sqlalchemy import and_

from main import app
from main.database import db
from main.models import User


class BaseTestCase(unittest.TestCase):
    def setUp(self):
        app.config['WTF_CSRF_ENABLED'] = False
        app.testing = True
        self.test_client = app.test_client()
        self.app = app

    def login(self, username='default', password='default'):
        return self.test_client.post('/pl/auth/login', data=dict(
            username=username,
            password=password,
        ), follow_redirects=True)

    def logout(self):
        return self.test_client.get('/pl/auth/logout', follow_redirects=True)

    @staticmethod
    def default_user():
        return db.query(User).filter(and_(User.username == 'default')).one_or_none()

    def assert_flash_message(self, expected_message, expected_category='message'):
        with self.test_client.session_transaction() as session:
            try:
                category, message = session['_flashes'][0]
            except KeyError:
                raise AssertionError('No flash messages')
            assert expected_message in message
            assert expected_category == category


@contextmanager
def captured_templates():
    recorded = []

    def record(sender, template, context, **extra):
        recorded.append((template, context))

    template_rendered.connect(record, app)

    try:
        yield recorded
    finally:
        template_rendered.disconnect(record, app)
