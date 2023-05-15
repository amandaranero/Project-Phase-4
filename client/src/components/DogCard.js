import React from 'react';

import '../DogCard.css';
function DogCard({ dog, isVisible }) {
  const { name, breed, age, dogimages} = dog;
  // const images = dogimages.map((image)=>{
  //   const {url, dog_id} = image
  //   return <img src = {url} />
  // })

  

  

  return isVisible ? (

    <div className='card'>
      {dogimages.map((image)=>{
    const {url, dog_id} = image
    return <img className='img' src={url} alt={`${name}’s photo`} /> /*We dont have picts yet but trying something*/
                  })}
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