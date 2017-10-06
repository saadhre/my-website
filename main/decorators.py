from functools import wraps

from flask import g, redirect, request, url_for


def auth_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user' not in g:
            return redirect(url_for('login', r=request.url))
        else:
            return f(*args, **kwargs)

    return decorated_function
