from flask_wtf import FlaskForm
from wtforms import PasswordField, StringField
from wtforms.validators import DataRequired, Email, EqualTo


class AuthForm(FlaskForm):
    username = StringField('username', validators=[DataRequired()])
    password = PasswordField('password', validators=[DataRequired()])


class ResetPasswordForm(FlaskForm):
    email = StringField('email', validators=[DataRequired(), Email()])


class ResetPasswordConfirmForm(FlaskForm):
    password = PasswordField('password', validators=[DataRequired(), EqualTo(fieldname='password_repeat', message='Entered passwords are not equal. Repeat please.')])
    password_repeat = PasswordField('password_repeat', validators=[DataRequired(), EqualTo(fieldname='password', message='Entered passwords are not equal. Repeat please.')])
