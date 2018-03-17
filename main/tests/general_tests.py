from main.tests.utils import BaseTestCase


class CoreTests(BaseTestCase):
    def test_redirect_to_default_language(self):
        response = self.test_client.get('/')
        assert 302 == response.status_code

    def test_index_for_languages(self):
        for index_path in ['/pl/', '/en/', '/ru/']:
            response = self.test_client.get(index_path)
            assert b'<h1 class="title">Index</h1>' in response.data

    def test_wrong_language_handling(self):
        response = self.test_client.get('/zu/')
        assert 404 == response.status_code

    def test_navbar_visible(self):
        response = self.test_client.get('/', follow_redirects=True)
        assert b'<nav class="navbar">' in response.data

    def test_static_pages(self):
        response = self.test_client.get('/pl/about-me')
        assert b'O mnie' in response.data
