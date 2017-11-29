#!/usr/bin/env python
from migrate.versioning.shell import main

if __name__ == '__main__':
    main(repository='.', url='postgresql://personal_website:pawulonik2002@localhost:5432/personal_website', debug='False')
