from flask_babel import gettext
from flask_wtf import FlaskForm
from wtforms import PasswordField, StringField
from wtforms.validators import DataRequired, Email, EqualTo


class AuthForm(FlaskForm):
    username = StringField('username', validators=[DataRequired()])
    password = PasswordField('password', validators=[DataRequired()])


class ResetPasswordForm(FlaskForm):
    email = StringField('email', validators=[DataRequired(), Email()])


class ResetPasswordConfirmForm(FlaskForm):
    error_message = gettext(u'Hasła nie są takie same')
    password_repeat = PasswordField('password_repeat', validators=[DataRequired(), EqualTo('password', message=error_message)])
    password = PasswordField('password', validators=[DataRequired(), EqualTo('password_repeat', message=error_message)])
