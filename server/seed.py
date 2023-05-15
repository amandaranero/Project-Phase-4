from faker import Faker
from app import app
from models import db, Adopter, Dog, Agency, DogImage
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
            address = fake.address(),
            email = fake.email()
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
            agency_id = rc(agencies)[0],
        )

        dogs.append(dog)

    db.session.add_all(dogs)
    db.session.commit()

def make_dog_images():
    DogImage.query.delete()
    dogs = db.session.query(Dog.id).all()

    images = []

    pic = ["https://images.dog.ceo/breeds/deerhound-scottish/n02092002_6915.jpg",
    'https://cdn.akc.org/content/hero/puppy_pictures_header.jpg', "https://images.dog.ceo/breeds/setter-irish/n02100877_2142.jpg","https://images.dog.ceo/breeds/hound-basset/n02088238_13683.jpg", "https://images.dog.ceo/breeds/corgi-cardigan/n02113186_1447.jpg",  "https://images.dog.ceo/breeds/airedale/n02096051_183.jpg", "https://images.dog.ceo/breeds/poodle-toy/n02113624_7964.jpg", "https://images.dog.ceo/breeds/terrier-silky/n02097658_6351.jpg", "https://images.dog.ceo/breeds/greyhound-italian/n02091032_4653.jpg"]

    for _ in range(10):
        image = DogImage(
            url = rc(pic),
            dog_id = rc(dogs)[0]
        )

        images.append(image)

        db.session.add_all(images)
        db.session.commit()


if __name__ == '__main__':
    with app.app_context():
        make_adopter()
        make_agency()
        make_dog()
        make_dog_images()