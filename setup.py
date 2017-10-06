from setuptools import setup


setup(
    name='Development ETA Calculator',
    version='alpha',
    long_description=__doc__,
    packages=['main'],
    include_package_data=True,
    install_requires=[
        'Flask>=0.12',
        'SQLAlchemy>=1.1.14'
    ],
)
