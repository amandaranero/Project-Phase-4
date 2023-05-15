import logo from "../dogpaw.png";
import "../index.css";
import {Link} from "react-router-dom"

function NavBar({ user, onLogout}) {


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
      return (
        <header>
          <div className="logo">
            <img src={logo} alt="Tinder for Dogs" />
            <h1 className="title">Doggy</h1>
          </div>
          <nav>
            <ul>
              <li>
                <button onClick={onLogout}>Logout</button>
              </li>
            </ul>
          </nav>

        </header>
      );
    }
}
export default NavBar;
//Trying to Push