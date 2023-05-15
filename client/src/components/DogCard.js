import React, { useEffect, useState } from 'react';
import AdopterPage from './AdopterPage'

import '../DogCard.css';
function DogCard({ dog, isVisible}) {
  const { name, breed, age, dogimages} = dog;
  const [dogPics, setDogPics] = useState([])

  useEffect(()=>{
    const images = dogimages.map((image)=>{
      return image
    })
    setDogPics(images)
  }, [])





  return isVisible ? (

    <div className='card'>
    <img className='img' src={dogPics[0] ? dogPics[0].url : null} alt={`${name}’s photo`} /> /*We dont have picts yet but trying something*/
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