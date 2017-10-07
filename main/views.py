from flask import redirect, render_template, request, url_for
from flask_gravatar import Gravatar

from main import app, flash_error, flash_success
from main.decorators import auth_required
from main.forms import AuthForm, ResetPasswordConfirmForm, ResetPasswordForm
from main.models import AuthModel, InitPasswordResetModel, PasswordResetModel

gravatar = Gravatar(app)


@app.route('/')
@auth_required
def index():
    return 'Hello World! <a href="%s">Sign Out!</a>' % url_for('logout')


@app.route('/auth/login', methods=['GET', 'POST'])
def login():
    form = AuthForm(request.form)
    if form.validate_on_submit():
        auth_model = AuthModel()
        form.populate_obj(auth_model)
        if auth_model.auth():
            return redirect(request.args.get('r', url_for('index')))
        else:
            flash_error(auth_model.error)
    return render_template('auth/login.html', form=form)


@app.route('/auth/logout')
@auth_required
def logout():
    auth_model = AuthModel()
    auth_model.signout()
    flash_success('You successfully logged out!')
    return redirect(url_for('index'))


@app.route('/auth/reset-password', methods=['GET', 'POST'])
def reset_password():
    form = ResetPasswordForm(request.form)
    if form.validate_on_submit():
        view_model = InitPasswordResetModel()
        form.populate_obj(view_model)
        view_model.send_reset_request()
        flash_success('If you entered a valid email address, you will receive an email with further instructions.')
        return redirect(url_for('login'))
    return render_template('auth/reset_password.html', form=form)


@app.route('/auth/reset-password/<path:reset_hash>', methods=['GET', 'POST'])
def reset_password_confirm(reset_hash):
    view_model = PasswordResetModel(reset_hash)
    if not view_model.validate_hash():
        flash_error('Your reset link expired. Try again.')
        return redirect(url_for('reset_password'))

    form = ResetPasswordConfirmForm(request.form)
    if form.validate_on_submit():
        form.populate_obj(view_model)
        view_model.reset_password()
        flash_success('Password successfully changed!')
        return redirect(url_for('login'))

    return render_template('auth/reset_password_confirm.html', form=form)
