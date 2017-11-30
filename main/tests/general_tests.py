import unittest

from sqlalchemy import and_

from main import app
from main.database import db
from main.models import User


class BaseTestCase(unittest.TestCase):
    def setUp(self):
        app.config['WTF_CSRF_ENABLED'] = False
        app.testing = True
        self.app = app.test_client()

    def login(self, username='default', password='default'):
        return self.app.post('/pl/auth/login', data=dict(
            username=username,
            password=password,
        ), follow_redirects=True)

    def logout(self):
        return self.app.get('/pl/auth/logout', follow_redirects=True)

    @staticmethod
    def default_user():
        return db.query(User).filter(and_(User.username == 'default')).one_or_none()


class CoreTests(BaseTestCase):
    def test_redirect_to_default_language(self):
        response = self.app.get('/')
        assert 302 == response.status_code

    def test_index_for_languages(self):
        for index_path in ['/pl/', '/en/', '/ru/']:
            response = self.app.get(index_path)
            assert b'<h1 class="title">Index</h1>' in response.data

    def test_wrong_language_handling(self):
        response = self.app.get('/zu/')
        assert 404 == response.status_code

    def test_navbar_visible(self):
        response = self.app.get('/', follow_redirects=True)
        assert b'<nav class="navbar">' in response.data

    def test_static_pages(self):
        response = self.app.get('/pl/about-me')
        assert b'O mnie' in response.data
