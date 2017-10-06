from main import app
from main.decorators import auth_required


@app.route('/')
@auth_required
def index():
    return 'Hello World!'


@app.route('/auth/login')
def login():
    return 'Login'


@app.route('/auth/logout')
@auth_required
def logout():
    return 'Logout'
