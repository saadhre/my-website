from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from main import app

engine = create_engine(app.config['DSN'])
db = scoped_session(sessionmaker(autocommit=False,
                                 autoflush=False,
                                 bind=engine))
Base = declarative_base()
Base.query = db.query_property()
