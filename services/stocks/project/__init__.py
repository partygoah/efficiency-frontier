from flask import Flask
from flask_restx import Api, Resource

api = Api()


@api.route('/stocks')
class Stocks(Resource):
    def get(self):
        return [{"id": 1, "name": "Game Stop"}, {"id": 2, "name": "Amazon"}]

if __name__ == '__main__':
    app.run(debug=True)


def create_app():
    app = Flask(__name__)
    
    api.init_app(app)