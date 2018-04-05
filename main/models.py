import uuid
from datetime import datetime

from flask import g, render_template, request, session
from flask_babel import gettext
from flask_mail import Message
from sqlalchemy import Column, DateTime, Integer, JSON, String, and_

from main import babel, bcrypt, mail
from main.database import Base, db


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    username = Column(String(50), unique=True)
    email = Column(String(120), unique=True)
    full_name = Column(String(100))
    password = Column(String(60))
    registered = Column(DateTime, default=datetime.now)
    last_login = Column(DateTime, nullable=True)
    password_reset_hash = Column(String(44), nullable=True, unique=True)
    password_reset_sent = Column(DateTime, nullable=True)
    locale = Column(String(2), nullable=False, default='pl')


class Log(Base):
    __tablename__ = 'logs'

    id = Column(Integer, primary_key=True)
    event = Column(String)
    ip = Column(String(50))
    data = Column(JSON, nullable=True)
    created = Column(DateTime)

    def __init__(self, event=None, data=None):
        self.event = event
        self.data = data
        self.ip = request.remote_addr
        self.created = datetime.today()


class Application:
    @staticmethod
    def is_authorized():
        return Application.current_user() is not None

    @staticmethod
    def current_user():
        if 'current_user' not in g:
            current_user_id = session.get('current_user')
            current_user = db.query(User).filter(User.id == current_user_id).one_or_none() if current_user_id else None
            g.current_user = current_user
        return g.current_user

    @staticmethod
    def authorize_user(user):
        user.last_login = datetime.now()
        db.commit()
        session['current_user'] = user.id
        Application.log_event('authorize_user', data={'user_id': user.id})

    @staticmethod
    def logout():
        Application.log_event('logout', data={'user_id': session.get('current_user')})
        session.pop('current_user')

    @staticmethod
    @babel.localeselector
    def get_locale():
        if 'lang_code' not in g:
            g.lang_code = babel.default_locale
        return g.lang_code

    @staticmethod
    def log_event(event, data=None):
        new_log = Log(event=event, data=data)
        db.add(new_log)
        db.commit()


class AuthModel:
    def __init__(self):
        self.username = None
        self.password = None
        self.error = None

    def auth(self):
        user = db.query(User).filter(and_(User.username == self.username)).one_or_none()
        if user is None or not bcrypt.check_password_hash(user.password, self.password):
            self.error = gettext(u'Niepoprawne parametry logowania')
            # log_event(AppEvent.LOGIN_ERROR, dict(username=self.username))
            return False
        Application.authorize_user(user)
        return True


class InitPasswordResetModel:
    def __init__(self):
        self.email = None

    def send_reset_request(self):
        user = db.query(User).filter(User.email == self.email).one_or_none()

        if user is not None:
            user.password_reset_hash = uuid.uuid4()
            db.commit()

            message = Message(subject=gettext(u'Rozpoczęto reset hasła'), sender='yarik@shatkevich.com', recipients=[user.email])
            message.html = render_template('emails/request_password_reset.html', hash=user.password_reset_hash)
            mail.send(message)

            user.password_reset_sent = datetime.now()
            db.commit()


class PasswordResetModel:
    def __init__(self, reset_hash):
        self.reset_hash = reset_hash
        self.password = None
        self.password_repeat = None

    def validate_hash(self):
        return self.users_by_hash().count() == 1

    def users_by_hash(self):
        return db.query(User).filter(User.password_reset_hash == self.reset_hash)

    def reset_password(self):
        user = self.users_by_hash().one()
        user.password = bcrypt.generate_password_hash(self.password).decode('utf-8')
        user.password_reset_hash = None
        user.password_reset_sent = None
        db.commit()

        message = Message(gettext(u'Zresetowano hasło'), sender='yarik@shatkevich.com', recipients=[user.email])
        message.html = render_template('emails/password_reset_confirmation.html', username=user.username)
        mail.send(message)


class ContactModel:
    def __init__(self):
        self.name = None
        self.email = None
        self.message = None

    def send(self):
        message = Message(subject=gettext(u'Nowy kontakt ze strony'), sender='yarik@shatkevich.com', recipients=['yarik@shatkevich.com'])
        message.html = render_template('emails/contact.html', name=self.name, email=self.email, message=self.message)
        mail.send(message)
