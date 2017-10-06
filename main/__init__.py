from flask import Flask, g

import main.database

app = Flask(__name__)

import main.views
