from flask import session

from main.forms import ResetPasswordForm
from main.tests.utils import BaseTestCase, captured_templates


class AuthTests(BaseTestCase):
    def test_login(self):
        with captured_templates() as templates:
            result = self.test_client.get('/pl/auth/login')
            assert b'Wymagana autoryzacja' in result.data

            assert len(templates) == 1
            template, context = templates[0]
            assert template.name == 'auth/login.html'

            result = self.login('admin', 'admin')
            assert b'Niepoprawne parametry logowania' in result.data

            result = self.login(None, None)
            assert b'<input autofocus class="input is-large is-danger" id="username"' in result.data
            assert b'<input class="input is-large is-danger" id="password"' in result.data

            result = self.login()
            assert b'Default Default' in result.data

    def test_logout(self):
        self.login()
        result = self.logout()
        assert bytes('Zaloguj się', 'utf-8') in result.data


class ResetPasswordTests(BaseTestCase):
    def test_rendered_template(self):
        with captured_templates() as templates:
            self.test_client.get('/pl/auth/reset-password')

            assert len(templates) == 1

            template, context = templates[0]
            assert template.name == 'auth/reset_password.html'
            assert isinstance(context['form'], ResetPasswordForm)

    def test_empty_email_provided(self):
        with captured_templates() as templates:
            self.test_client.post('/pl/auth/reset-password')

            template, context = templates[0]

            errors = context['form'].email.errors
            assert len(errors) == 1
            assert errors[0] == 'To pole jest wymagane.'

    def test_not_email_provided(self):
        with captured_templates() as templates:
            self.test_client.post('/pl/auth/reset-password', data=dict(
                email='default'
            ))

            template, context = templates[0]

            errors = context['form'].email.errors
            assert len(errors) == 1
            assert errors[0] == 'Nieprawidłowy adres e-mail.'

    def test_not_registered_email_provided(self):
        with self.app.test_request_context():
            result = self.test_client.post('/pl/auth/reset-password', data=dict(
                email='wrong@email.com'
            ), follow_redirects=True)

            assert bytes('Jeżeli wprowadziłeś poprawny adres to za chwilę otrzymasz e-maila z dalszymi instrukcjami', 'utf-8') in result.data

            result = self.test_client.post('/pl/auth/reset-password', data=dict(
                email='default@default.com'
            ), follow_redirects=True)
            assert bytes('Jeżeli wprowadziłeś poprawny adres to za chwilę otrzymasz e-maila z dalszymi instrukcjami', 'utf-8') in result.data

    def test_reset_finalize(self):
        reset_url = '/pl/auth/reset-password/%s' % self.default_user().password_reset_hash

        result = self.test_client.get('/pl/auth/reset-password/wrong-hash', follow_redirects=True)
        assert bytes('Link resetowania hasła już wygasł, spróbuj ponownie', 'utf-8') in result.data

        result = self.test_client.get(reset_url)
        assert bytes('Zmień swoje hasło', 'utf-8') in result.data

        result = self.test_client.post(reset_url, follow_redirects=True)
        assert b'<input autofocus class="input is-large is-danger" id="password"' in result.data
        assert b'<input class="input is-large is-danger" id="password_repeat"' in result.data

        result = self.test_client.post(reset_url, data=dict(
            password='default',
            password_repeat='default_default',
        ), follow_redirects=True)
        assert bytes('Hasła nie są takie same', 'utf-8') in result.data

        result = self.test_client.post(reset_url, data=dict(
            password='default',
            password_repeat='default',
        ), follow_redirects=True)
        assert bytes('Pomyślnie zmieniłeś swoje hasło', 'utf-8') in result.data
