from flask import Flask, make_response, request
from flask_migrate import Migrate
from flask_restful import Api, Resource
from models import db, Adopter, Agency, Dog


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False


migrate = Migrate(app, db)
db.init_app(app)
api = Api(app)


class Adopters(Resource):
    def get(self):
        adopters = [adopters.to_dict() for adopters in Adopter.query.all()]
        return make_response(
            adopters,
            200
        )
    def post(self):
        data = request.get_json()
        try:
            new_adopter = Adopter(
                name = data['name'],
                username = data['username'],
                email = data['email'],
                bio = data['bio']
            )
            db.session.add(new_adopter)
            db.session.commit()
            return make_response(
                new_adopter.to_dict(),
                201
            )
        except Exception as ex:
            return make_response({
                'errors': [ex.__str__()]
            }, 400)
api.add_resource(Adopters, '/adopters')


class AdopterById(Resource):
    def get(self, id):
        adopter = Adopter.query.filter_by(id=id).first()
        if not adopter:
            return make_response({
                'error': 'That user does not exist'
            }, 404)
        return make_response(
            adopter.to_dict(),
            200
        )
api.add_resource(AdopterById, '/adopters/<int:id>')

class Agencies(Resource):
    def get(self):
        agencies = [agencies.to_dict() for agencies in Agency.query.all()]
        return make_response(
            agencies,
            200
        )

    def post(self):
        data = request.get_json()
        try:
            new_agency = Agency(
                name = data['name'],
                username = data['username'],
                email = data['email'],
                address = data['address']
            )
            db.session.add(new_agency)
            db.session.commit()
            return make_response(
                new_agency.to_dict(),
                201
            )
        except Exception as ex:
            return make_response({
                'errors': [ex.__str__()]
            }, 400)

api.add_resource(Agencies, '/agencies')

if __name__ == '__main__':
    app.run(port=5555, debug=True)