import DogCard from './DogCard'

function DogContainer({dogs}){
    const dogCards = dogs.map((dog)=>(
      <DogCard  key={dog.id} dog={dog} />
    ))

    return <div id='dog-container'>
        <ul>
            <li>
                {dogCards}
            </li>
        </ul>
    </div>
}

export default DogContainer