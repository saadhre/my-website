import os
from email import header

from flask import Flask, flash
from flask_babel import Babel
from flask_bcrypt import Bcrypt
from flask_mail import Mail

app = Flask(__name__, instance_relative_config=True)
app.config.update(
    SECRET_KEY='secret_key',
    MAIL_PORT=587,
    MAIL_USE_TLS=True,
    BABEL_DEFAULT_LOCALE='pl',
    BABEL_DEFAULT_TIMEZONE='Europe/Warsaw',
    BABEL_TRANSLATION_DIRECTORIES=os.path.join(os.getcwd(), 'translations'),
    DSN='sqlite:///memory'
)
app.config.from_pyfile('application.cfg', silent=False)

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


import main.cli
import main.views
