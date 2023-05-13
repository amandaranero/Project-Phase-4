import React from 'react';
import '../DogCard.css';

function DogCard({ dog, isVisible }) {
  const { id, name, dogimages, breed, age } = dog;
  return isVisible ? (
    <div className="card">
      <img className="img" src={dogimages} alt={`${name}'s photo`} /> /*We dont have picts yet but trying something*/
      <div className="content">
        <div className="title">
          {name}
        </div>
        <div className="info">
          <span>Breed: {breed}</span> 
          <span>Age: {age}</span>       
        </div>
      </div>
    </div>
  ) : null;
}

export default DogCard;

