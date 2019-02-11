import json

import requests
from wtforms.validators import Length, ValidationError
from gettext import gettext as _

from . import app


class RecaptchaValidator(Length):
    def __init__(self):
        super().__init__(10, 2000, _('Czy jesteś botem?'))

    def __call__(self, form, field):
        super().__call__(form, field)
        response = requests.post('https://www.google.com/recaptcha/api/siteverify', data={
            'secret': app.config.get('RECAPTCHA_SERVER_KEY'),
            'response': field.data
        })
        response_data = json.loads(response.content)

        if 'score' not in response_data or response_data['score'] < 0.8:
            raise ValidationError(self.message)
