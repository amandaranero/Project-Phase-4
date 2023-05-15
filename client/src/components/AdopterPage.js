import DogContainer from "./DogContainer"
import NavBar from "./NavBar"
import {useState, useEffect} from 'react'
import {Link} from "react-router-dom"


function AdopterPage({ dogs, user, onLogout }) {
    const [showAgencies, setShowAgencies] = useState(false);
  


    const handleShowAgencies = () => {
      setShowAgencies(!showAgencies);
    };


    return (
      <div className="page-container">
          <NavBar isLoggedIn={user !== null} user={user} onLogout={onLogout} />
        <div className="page-content">
          <DogContainer dogs={dogs} />
          <div>
            <Link to="/allagencies">
                  <button onClick={handleShowAgencies}>See All Adoption Agencies</button>
              </Link>
          </div>
        </div>
      </div>
    );
  }
  
  export default AdopterPage;

//   <NavBar isLoggedIn={user !== null} onLogout={onLogout} user={user} />
