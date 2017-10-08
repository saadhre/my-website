from sqlalchemy import *


def upgrade(migrate_engine):
    meta = MetaData(bind=migrate_engine)
    users = Table('users', meta, autoload=True)
    locale = Column('locale', String(2), nullable=False, server_default='pl')
    locale.create(users)


def downgrade(migrate_engine):
    meta = MetaData(bind=migrate_engine)
    users = Table('users', meta, autoload=True)
    users.c.locale.drop()
