import click

from main import app, bcrypt
from main.database import db
from main.models import User


@app.cli.command()
def create_admin():
    def validate_username(username):
        if db.query(User).filter(User.username == username).count() > 0:
            click.echo('Username already taken!')
            return False
        return True

    def validate_email(email):
        if db.query(User).filter(User.email == email).count() > 0:
            click.echo('E-mail already registered!')
            return False
        return True

    def validate_password(password):
        if len(password) < 6:
            click.echo('Password too weak')
            return False
        return True

    def collect_input(label, validator=None, is_password=False):
        while True:
            result = click.prompt(label, hide_input=is_password)
            if validator:
                if validator(result):
                    return result
            else:
                return result

    new_user = User()
    new_user.username = collect_input('Username', validate_username)
    new_user.email = collect_input('E-mail', validate_email)
    new_user.password = bcrypt.generate_password_hash(collect_input('Password', validator=validate_password, is_password=True)).decode('utf-8')
    new_user.full_name = collect_input('Full name')

    db.add(new_user)
    db.commit()

    click.echo('Administrator successfully created!')
