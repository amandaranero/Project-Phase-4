from flask import Flask, make_response, request, session, render_template
from flask_migrate import Migrate
from flask_restful import Api, Resource
from models import db, Adopter, Agency, Dog, DogImage
import uuid
# from dotenv import load_dotenv
# load_dotenv()
import boto3
import botocore
import os




app = Flask(
    __name__,
    static_url_path='',
    static_folder='../client/build',
    template_folder='../client/build'
)

...

@app.route('/')
@app.route('/<int:id>')
def index(id=0):
    return render_template("index.html")



app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = b'\xd3"mM\x15\xa0\xf0\xd2\xd0.0\xbb\xef\xaep\xea'
app.json.compact = False


migrate = Migrate(app, db)
db.init_app(app)
api = Api(app)


BUCKET_NAME = os.environ.get('AWS_BUCKET_NAME')
S3_LOCATION = os.environ.get('AWS_DOMAIN')
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

s3 = boto3.client('s3',
                    aws_access_key_id=os.environ.get('AWS_ACCESS_KEY'),
                    aws_secret_access_key= os.environ.get('AWS_SECRET_ACCESS_KEY')
                     )
def allowed_file(filename):
    return "." in filename and \
           filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

def get_unique_filename(filename):
    ext = filename.rsplit(".", 1)[1].lower()
    unique_filename = uuid.uuid4().hex
    return f"{unique_filename}.{ext}"


def upload_file_to_s3(file):
    try:
        s3.upload_fileobj(
            file,
            BUCKET_NAME,
            file.filename,
            ExtraArgs={
                "ContentType": file.content_type
            }
        )
    except Exception as e:
        # in case the our s3 upload fails
        return {"errors": str(e)}

    return {"url": f"{S3_LOCATION}{file.filename}"}



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
                bio = data['bio'],
                adopter = True
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

class NewDog(Resource):
    def post(self):
        data = request.form
        imagedata= request.files['image']

        try:
            new_dog = Dog(
                name=data['name'],
                age=data['age'],
                breed=data['breed'],
                temperment=data['temperment'],
                agency_id = session['agency_id']
            )
            db.session.add(new_dog)
            db.session.commit()

            imagedata.filename = get_unique_filename(imagedata.filename)
            image = upload_file_to_s3(imagedata)

            photo = DogImage(
                url = image['url'],
                dog_id = new_dog.id
            )

            db.session.add(photo)
            db.session.commit()

            print(photo.url)

            return make_response(
                new_dog.to_dict(),
                200)

            
        except Exception as ex:
            print([ex.__str__()])
            return make_response({'errors': [ex.__str__()]}, 401)

api.add_resource(NewDog, '/newdog')

class Dogs(Resource):
    dogs = [dogs.to_dict() for dogs in Dog.query.all()]

    return make_response(
        dogs,200
    )

api.add_resource(Dogs,'/dogs')


if __name__ == '__main__':
    app.run(port=5555, debug=True)