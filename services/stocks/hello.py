from flask import Flask

# Test
app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello!'