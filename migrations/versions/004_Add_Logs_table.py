from sqlalchemy import *
from migrate import *


meta = MetaData()

logs = Table(
    'logs', meta,
    Column('id', Integer, primary_key=True),
    Column('event', String),
    Column('ip', String(50)),
    Column('data', JSON, nullable=True),
    Column('created', DateTime)
)


def upgrade(migrate_engine):
    meta.bind = migrate_engine
    logs.create()


def downgrade(migrate_engine):
    meta.bind = migrate_engine
    logs.drop()
