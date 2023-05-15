import { useState } from 'react';
import DogCard from './DogCard'

function DogContainer({dogs}){
    const [visibleCardIndex, setVisibleCardIndex] = useState(0);
    const dogCards = dogs.map((dog, index)=>(
      <DogCard key={dog.id} dog={dog}  
        isVisible={index === visibleCardIndex}/>
    ))
    
    
    
function handleSwipe(){
    setVisibleCardIndex((VisibleCardIndex) => (VisibleCardIndex + 1) % dogs.length);

}
    return <div id='dog-container'>
        <ul>
            <li>
                {dogCards}
            </li>
        </ul>
        <button id="swipe-button" onClick={handleSwipe}>
        {">"}
      </button>
    </div>
}
export default DogContainer