from datetime import datetime

from sqlalchemy import *

meta = MetaData()

user = Table(
    'users', meta,
    Column('id', Integer, primary_key=True),
    Column('username', String(50), unique=True),
    Column('password', String(60)),
    Column('email', String(120), unique=True),
    Column('full_name', String(120), nullable=True),
    Column('registered', DateTime, default=datetime.now),
    Column('last_login', DateTime, nullable=True)
)


def upgrade(migrate_engine):
    meta.bind = migrate_engine
    user.create()


def downgrade(migrate_engine):
    meta.bind = migrate_engine
    user.drop()
