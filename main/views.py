from flask import Blueprint, g, redirect, render_template, request, url_for
from flask_babel import gettext
from flask_gravatar import Gravatar

from main import app, flash_error, flash_success
from main.decorators import auth_required
from main.forms import AuthForm, ResetPasswordConfirmForm, ResetPasswordForm
from main.models import Application, AuthModel, InitPasswordResetModel, PasswordResetModel

gravatar = Gravatar(app)

front = Blueprint('front', __name__, url_prefix='/<string(length=2):lang_code>')


@front.url_defaults
def add_language_code(endpoint, values):
    values.setdefault('lang_code', g.lang_code)


@front.url_value_preprocessor
def pull_lang_code(endpoint, values):
    g.lang_code = values.pop('lang_code')


@app.route('/')
def no_language_selected():
    return redirect(url_for('front.index', lang_code=Application.get_locale()))


@front.route('/')
def index():
    return render_template('pages/index.html')


@front.route('/auth/login', methods=['GET', 'POST'])
def login():
    form = AuthForm(request.form)
    if form.validate_on_submit():
        auth_model = AuthModel()
        form.populate_obj(auth_model)
        if auth_model.auth():
            return redirect(request.args.get('r', url_for('front.index')))
        else:
            flash_error(auth_model.error)
    return render_template('auth/login.html', form=form)


@front.route('/auth/logout')
@auth_required
def logout():
    Application.logout()
    return redirect(url_for('front.index'))


@front.route('/auth/reset-password', methods=['GET', 'POST'])
def reset_password():
    form = ResetPasswordForm(request.form)
    if form.validate_on_submit():
        view_model = InitPasswordResetModel()
        form.populate_obj(view_model)
        view_model.send_reset_request()
        flash_success(gettext(u'Jeżeli wprowadziłeś poprawny adres to za chwilę otrzymasz e-maila z dalszymi instrukcjami'))
        return redirect(url_for('front.login'))
    return render_template('auth/reset_password.html', form=form)


@front.route('/auth/reset-password/<path:reset_hash>', methods=['GET', 'POST'])
def reset_password_confirm(reset_hash):
    view_model = PasswordResetModel(reset_hash)
    if not view_model.validate_hash():
        flash_error(gettext(u'Link resetowania hasła już wygasł, spróbuj ponownie'))
        return redirect(url_for('front.reset_password'))

    form = ResetPasswordConfirmForm(request.form)
    if form.validate_on_submit():
        form.populate_obj(view_model)
        view_model.reset_password()
        flash_success(gettext(u'Pomyślnie zmieniłeś swoje hasło'))
        return redirect(url_for('front.login'))

    return render_template('auth/reset_password_confirm.html', form=form)


@front.route('/users')
@auth_required
def users():
    return 'Users'


@front.route('/<string(minlength=3):path>')
def page(path):
    return render_template('pages/%s.html' % path)


app.register_blueprint(front)
