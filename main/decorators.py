from functools import wraps

from flask import redirect, request, url_for

from main import Application


def auth_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        return f(*args, **kwargs) if Application.is_authorized() else redirect(url_for('front.login', r=request.url))

    return decorated_function
