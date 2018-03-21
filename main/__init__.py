from __future__ import print_function

import os
from email import header

from flask import Flask, flash
from flask_babel import Babel
from flask_bcrypt import Bcrypt
from flask_mail import Mail
from raven.contrib.flask import Sentry

app = Flask(__name__)
app.config.update(
    MAIL_PORT=587,
    MAIL_USE_TLS=True,
    BABEL_DEFAULT_LOCALE='pl',
    BABEL_DEFAULT_TIMEZONE='Europe/Warsaw',
    BABEL_TRANSLATION_DIRECTORIES=os.path.join(os.getcwd(), 'translations'),
    SECRET_KEY=os.getenv('APP_SECRET_KEY', 'secret_key'),
    DSN=os.getenv('DATABASE_URL', 'sqlite:///memory'),
    MAIL_SERVER=os.getenv('MAIL_SERVER'),
    MAIL_USERNAME=os.getenv('MAIL_USERNAME'),
    MAIL_PASSWORD=os.getenv('MAIL_PASSWORD')
)

sentry = Sentry(app, dsn='https://087db983889944d58e86c47ebe3c2b39:3e9e8fa5af0942ffa70c626a5572328a@sentry.io/305517')

header.MAXLINELEN = 32

bcrypt = Bcrypt(app)
mail = Mail(app)
babel = Babel(app)

import main.database
from main.models import Application


def flash_error(message):
    flash(message, 'danger')


def flash_success(message):
    flash(message, 'success')


@app.before_request
def init_user():
    Application.is_authorized()


import main.cli
import main.views
