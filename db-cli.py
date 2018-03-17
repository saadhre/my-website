#!/usr/bin/env python
from migrate.versioning.shell import main
from main import app

if __name__ == '__main__':
    main(repository='migrations', url=app.config['DSN'], debug='False')
