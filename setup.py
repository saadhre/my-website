from setuptools import setup

setup(
    name='Personal Website',
    version='alpha',
    long_description=__doc__,
    packages=['main'],
    include_package_data=True,
    install_requires=[
        'Flask>=0.12',
        'Flask-Gravatar>=0.4.2',
        'SQLAlchemy>=1.1.14',
        'psycopg2>=2.7.3.1',
        'Flask-WTF>=0.14.2', 'click',
        'SQLAlchemy-Migrate>=0.11',
        'Flask-Bcrypt>=0.7.1',
        'Flask-Mail>=0.9.1',
        'Flask-Babel>=0.11.2'
    ],
)
