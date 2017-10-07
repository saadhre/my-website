import os
from flask import Flask, flash
from flask_babel import Babel
from flask_bcrypt import Bcrypt
from flask_mail import Mail
from email import header

import main.database

app = Flask(__name__)
app.config.update(
    SECRET_KEY='myAwesomeKey',
    MAIL_SERVER='smtp.zoho.eu',
    MAIL_PORT=587,
    MAIL_USE_TLS=True,
    MAIL_USERNAME='yarik@shatkevich.com',
    MAIL_PASSWORD='pawulonik2002',
    BABEL_DEFAULT_LOCALE='ru',
    BABEL_DEFAULT_TIMEZONE='Europe/Warsaw',
    BABEL_TRANSLATION_DIRECTORIES=os.path.join(os.getcwd(), 'translations'),
)

bcrypt = Bcrypt(app)
mail = Mail(app)
header.MAXLINELEN = 32
babel = Babel(app)


def flash_error(message):
    flash(message, 'danger')


def flash_success(message):
    flash(message, 'success')


import main.cli
import main.views
