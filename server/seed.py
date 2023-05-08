from faker import Faker
from app import app
from models import db, Adopter, Dog, Agency
from random import choice as rc, randint
from app import app
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine

fake = Faker()


def make_adopter():

    Adopter.query.delete()

    adopters = []

    for _ in range(10):
        adopter = Adopter(
            name = fake.name(),
            email = fake.email(),
            username = fake.user_name(),
            bio = fake.text()
        )

        adopters.append(adopter)

    db.session.add_all(adopters)
    db.session.commit()


def make_agency():

    Agency.query.delete()
    agencies = []

    for _ in range(10):
        agency = Agency(
            name = fake.name(),
            username = fake.user_name(),
            address = fake.address()
        )

        agencies.append(agency)

    db.session.add_all(agencies)
    db.session.commit()


def make_dog():

    Dog.query.delete()
    adopters = db.session.query(Adopter.id).all()
    agencies = db.session.query(Agency.id).all()

    dogs = []

    for _ in range(10):
        dog = Dog(
            name = fake.name(),
            breed = fake.name(),
            age = randint(0, 15),
            temperment = fake.name(),
            adopter_id = rc(adopters)[0],
            agency_id = rc(agencies)[0]
        )

        dogs.append(dog)

    db.session.add_all(dogs)
    db.session.commit()

if __name__ == '__main__':
    with app.app_context():
        make_adopter()
        make_agency()
        make_dog()