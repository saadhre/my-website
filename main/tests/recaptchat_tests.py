from main.tests.utils import BaseTestCase


class CoreTests(BaseTestCase):
    def test_client_side(self):
        response = self.test_client.get('/pl/contact')
        assert 200 == response.status_code
        assert b'https://www.google.com/recaptcha' in response.data
