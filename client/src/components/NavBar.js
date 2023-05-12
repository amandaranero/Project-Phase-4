
import logo from "../dogpaw.png";
import "../index.css";
import facebook from "../facebook.png";
import instagram from "../instagram.png";
import tiktok from "../tiktok.png";
import twitter from "../twitter.png";
import youtube from "../youtube.png";
import {Link, useNavigate} from "react-router-dom"

function Navbar({onLogout, user}) {

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
              <div className="center">
            <h2>Swipe Right</h2>
            <Link to = {'/newadopter'}>
                <button>New Adopter</button>
            </Link>
            <Link to = {'/newagency'}>
                <button>New Agency</button>
            </Link>
            <li><Link to="/adopterlogin">
                  <button>Adopter Login</button>
              </Link></li>
              <li><Link to="/agencylogin">
                  <button>Agency Login</button>
              </Link></li>
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

      =
            <div className="center">
              {/* <h2>Swipe Right</h2>
              <Link to = {'/newadopter'}>
                  <button>New Adopter</button>
              </Link>
              <Link to = {'/newagency'}>
                  <button>New Agency</button>
              </Link> */}
              <div>
                <li><button onClick = {handleLogout}>Logout</button></li>
            </div>
              
            </div>
            <div id="legal-careers">
              <div className="legal">
                <h2>Legal</h2>
              </div>
              <div className="careers">
                <h2>Careers</h2>
              </div>
              <div className="social">
              <h2>Social</h2>
              <div className="social-icons">
                <img src={instagram} alt="Instagram" />
                <img src={tiktok} alt="Tiktok" />
                <img src={youtube} alt="Youtube" />
                <img src={twitter} alt="Twitter" />
                <img src={facebook} alt="Facebook" />
              </div>
            </div>
              <div className="faq">
                <h2>FAQ</h2>
              </div>
            </div>
          </header>
      );
}
} 

export default Navbar