import unittest

import main


class IndexTestCase(unittest.TestCase):
    def setUp(self):
        main.app.testing = True
        self.app = main.app.test_client()

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


if __name__ == '__main__':
    unittest.main()
