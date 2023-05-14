import DogContainer from "./DogContainer"
import NavBar from "./NavBar"
import {useState} from 'react'
import {Link} from "react-router-dom"


function AdopterPage({ dogs, user, onLogout }) {
    const [showAgencies, setShowAgencies] = useState(false);
  
    const handleShowAgencies = () => {
      setShowAgencies(!showAgencies);
    };
  
    return (
      <div className="page-container">
        <NavBar isLoggedIn={user !== null} onLogout={onLogout} user={user} />
        <div>
          <header>
            <Link to="/allagencies">
              <button onClick={handleShowAgencies}>See All Adoption Agencies</button>
            </Link>
          </header>
        </div>
        <div className="page-content">
          <DogContainer dogs={dogs} />
        </div>
      </div>
    );
  }
  
  export default AdopterPage;
  