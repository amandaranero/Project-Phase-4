from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin

convention = {
  "ix": "ix_%(column_0_label)s",
  "uq": "uq_%(table_name)s_%(column_0_name)s",
  "ck": "ck_%(table_name)s_%(constraint_name)s",
  "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
  "pk": "pk_%(table_name)s"
}


metadata = MetaData(naming_convention=convention)

db = SQLAlchemy(metadata=metadata)

class Adopter(db.Model, SerializerMixin):
    __tablename__ = "adopters"

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)
    username = db.Column(db.String)
    email = db.Column(db.String)
    bio = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())

    dogs = db.relationship('Dog', backref = 'adopter', cascade = 'all, delete, delete-orphan')
    agencies = association_proxy('dogs', 'agency')

class Dog(db.Model, SerializerMixin):
    __tablename__ = "dogs"

    id = db.Column(db.Integer, primary_key = True)
    adopter_id = db.Column(db.Integer, db.ForeignKey('adopters.id'))
    agency_id = db.Column(db.Integer, db.ForeignKey('agencies.id'))
    name = db.Column(db.String)
    breed = db.Column(db.String)
    age = db.Column(db.Integer)
    temperment = db.Column(db.String)
    status = db.Column(db.Boolean, default = False)
    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())

class Agency(db.Model, SerializerMixin):
    __tablename__ = "agencies"

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)
    username = db.Column(db.String)
    address = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())

    dogs = db.relationship('Dog', backref = 'agency', cascade = 'all, delete, delete-orphan')
    adopters = association_proxy('dogs', 'adopter')




