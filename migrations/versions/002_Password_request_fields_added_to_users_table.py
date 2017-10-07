from sqlalchemy import Column, MetaData, String, Table, DateTime


def upgrade(migrate_engine):
    meta = MetaData(bind=migrate_engine)
    users = Table('users', meta, autoload=True)
    password_reset_hash = Column('password_reset_hash', String(44), nullable=True)
    password_reset_hash.create(users)
    password_reset_sent = Column('password_reset_sent', DateTime, nullable=True)
    password_reset_sent.create(users)


def downgrade(migrate_engine):
    meta = MetaData(bind=migrate_engine)
    users = Table('users', meta, autoload=True)
    users.c.password_reset_hash.drop()
    users.c.password_reset_sent.drop()
