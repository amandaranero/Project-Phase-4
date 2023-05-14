import React from 'react';

import '../DogCard.css';
function DogCard({ dog, isVisible }) {
  const { id, name, dogimages, breed, age } = dog;
  const dogimage = dogimages.map((image)=>{
    return image = {image}
  })
  const {url} = dogimage
  console.log(url)

  return isVisible ? (

    <div className='card'>
      <img className='img' src={url} alt={`${name}’s photo`} /> /*We dont have picts yet but trying something*/
      <div className='content'>
        <div className='title'>
          {name}
        </div>
        <div className='info'>
          <span>Breed: {breed}</span>
          <span>Age: {age}</span>
        </div>
      </div>
    </div>
  ) : null;
}
export default DogCard;