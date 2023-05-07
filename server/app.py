from flask import Flask, make_response, request, session
from flask_migrate import Migrate
from flask_restful import Api, Resource
from models import db, Adopter, Agency, Dog


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = b'\xd3"mM\x15\xa0\xf0\xd2\xd0.0\xbb\xef\xaep\xea'
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

class LoginAdopter(Resource):
    def post(self):
        username = request.get_json()['username']
        try:
            adopter = Adopter.query.filter(Adopter.username == username).first()
            session['adopter_id'] = adopter.id
            return make_response(
                adopter.to_dict(),
                200
            )
        except:
            return make_response({
                'message': 'That username does not exist'
                }, 401)
  

api.add_resource(LoginAdopter, '/loginadopter')

class CheckSession(Resource):
    def get(self):
        if session.get('adopter_id'):

            adopter = Adopter.query.filter(Adopter.id == session['adopter_id']).first()

            return make_response(
                adopter.to_dict(),
                200
            )
        elif session.get('agency_id'):
            agency = Agency.query.filter(Agency.id == session['agency_id']).first()

            return make_response(
                agency.to_dict(),
                200
            )

        return make_response({
            'error' : '401 Unauthorized'
        }, 401)

api.add_resource(CheckSession, '/check_session')

class LoginAgency(Resource):
    def post(self):
        username = request.get_json()['username']
        try:
            agency = Agency.query.filter(Agency.username == username).first()

            session['agency_id'] = agency.id

            return make_response(
                agency.to_dict(),
                200
            )
        except:
            return make_response({
                'error': 'That username does not exist'
                }, 400)

api.add_resource(LoginAgency, '/loginagency')

class Logout(Resource):
    def delete(self):
        if session.get('adopter_id'):
            session['adopter_id'] = None

            return make_response({
                'message': 'No User logged in'
                }, 204)

        elif session.get('agency_id'):
            session['agency_id'] = None

            return make_response({
                'message': 'No User logged in'
                }, 204)
        
api.add_resource(Logout, '/logout')

if __name__ == '__main__':
    app.run(port=5555, debug=True)