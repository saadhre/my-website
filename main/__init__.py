from flask import Flask, flash
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
)

bcrypt = Bcrypt(app)
mail = Mail(app)


def flash_error(message):
    flash(message, 'danger')


def flash_success(message):
    flash(message, 'success')


import main.cli
import main.views
