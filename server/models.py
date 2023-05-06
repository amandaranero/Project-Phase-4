from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin


metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

class Adopter(db.Model, SerializerMixin):
    __tablename__ = "adopters"

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False)
    username = db.Column(db.String, nullable = False)
    email = db.Column(db.String, nullable = False)
    bio = db.Column(db.String(5,50), nullable = False)
    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())

    dogs = db.relationship('Dog', backref = 'adopter', cascade = 'all, delete, delete-orphan')
    agencies = association_proxy('dogs', 'agency')

    serialize_rules = ('-created_at', '-updated_at', '-dogs')

    @validates('name')
    def validates_name(self, key, value):
        if not value:
            raise ValueError('Must have name')
        return value

    @validates('username')
    def validates_name(self, key, value):
        if not value:
            raise ValueError('Must have username')
        return value

    @validates('email')
    def validates_name(self, key, value):
        if not value:
            raise ValueError('Must have email')
        return value

    @validates('bio')
    def validates_name(self, key, value):
        if not value:
            raise ValueError('Must have bio')
        return value

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
    name = db.Column(db.String, nullable = False)
    username = db.Column(db.String, nullable = False)
    address = db.Column(db.String, nullable = False)
    email = db.Column(db.String, nullable = False)
    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())

    dogs = db.relationship('Dog', backref = 'agency', cascade = 'all, delete, delete-orphan')
    adpopters = association_proxy('dogs', 'adopter')

    serialize_rules = ('-created_at', '-updated_at', '-dogs')

    @validates('name')
    def validates_name(self, key, value):
        if not value:
            raise ValueError('Must have name')
        return value

    @validates('username')
    def validates_name(self, key, value):
        if not value:
            raise ValueError('Must have username')
        return value

    @validates('email')
    def validates_name(self, key, value):
        if not value:
            raise ValueError('Must have email')
        return value

    @validates('address')
    def validates_name(self, key, value):
        if not value:
            raise ValueError('Must have address')
        return value




