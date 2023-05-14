
import logo from "../dogpaw.png";
import "../index.css";
import {Link, useNavigate} from "react-router-dom"

function NavBar({onLogout, user}) {

//if there is no user logged in... have login button and create user button
//if a user is in agency then you have to home button and see all dogs/etc
//if a user is an adopter then you home button/logout 

  const navigate = useNavigate()

  function handleLogout(){
    fetch('/logout',{
      method: 'DELETE'
    })
    .then(()=>onLogout())
    .then(()=>{
      navigate('/')
    })
  }
  

    
  
  if (!user){
      return (
        <header>
            <div className="logo">
              <img src={logo} alt="Tinder for Dogs" />
              <h1 className="title">Doggy</h1>
            </div>
              <nav>
              <ul>
                <li className = "right-links">
                  <ul>
                    <li>
              <Link to="/adopterlogin">
                  <button>Adopter Login</button>
              </Link>
              </li>
              <li><Link to="/agencylogin">
                  <button>Agency Login</button>
              </Link></li>
              </ul>
                </li>
              </ul>
            </nav>
              <div className="center">
            <h2>Swipe Right</h2>
            <Link to = {'/newadopter'}>
                <button>New Adopter</button>
            </Link>
            <Link to = {'/newagency'}>
                <button>New Agency</button>
            </Link>
            </div>
        </header>
    )} else {
        return(
          <header>
            <div className="logo">
              <img src={logo} alt="Tinder for Dogs" />
              <h1 className="title">Doggy</h1>
            </div>

            <div>
            </div>
            <div className="center">
              <div>
                <li><button onClick = {handleLogout}>Logout</button></li>
            </div>
          </div>
              
          </header>
      );
}
} 

export default NavBar