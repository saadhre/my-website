import os
from email import header

from flask import Flask, flash, g
from flask_babel import Babel
from flask_bcrypt import Bcrypt
from flask_mail import Mail

import main.database

app = Flask(__name__)
app.config.update(
    SECRET_KEY='myAwesomeKey',
    MAIL_SERVER='smtp.zoho.eu',
    MAIL_PORT=587,
    MAIL_USE_TLS=True,
    MAIL_USERNAME='yarik@shatkevich.com',
    MAIL_PASSWORD='pawulonik2002',
    BABEL_DEFAULT_LOCALE='pl',
    BABEL_DEFAULT_TIMEZONE='Europe/Warsaw',
    BABEL_TRANSLATION_DIRECTORIES=os.path.join(os.getcwd(), 'translations'),
)
header.MAXLINELEN = 32

bcrypt = Bcrypt(app)
mail = Mail(app)
babel = Babel(app)

from main.models import Application


def flash_error(message):
    flash(message, 'danger')


def flash_success(message):
    flash(message, 'success')


import main.cli
import main.views
