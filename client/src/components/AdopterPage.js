

import DogContainer from './DogContainer'
import NavBar from './NavBar';
function AdopterPage({ dogs, user, onLogout }) {
    return (
      <div>
        <NavBar isLoggedIn={user !== null} onLogout={onLogout} user={user} />
        <DogContainer dogs={dogs} />
      </div>
    );
  }

export default AdopterPage


// Try to Push