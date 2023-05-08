import React from 'react';
import logo from "../dogpaw.png";
import "../index.css";
import facebook from "../facebook.png";
import instagram from "../instagram.png";
import tiktok from "../tiktok.png";
import twitter from "../twitter.png";
import youtube from "../youtube.png";

function Navbar() {
  return (
    <header>
      <div className="logo">
        <img src={logo} alt="Tinder for Dogs" />
        <h1 className="title">Doggy</h1>
      </div>
      <nav>
        <ul>
          <li><a href="#">Learn</a></li>
          <li><a href="#">Product</a></li>
          <li><a href="#">Safety</a></li>
          <li><a href="#">Support</a></li>
          <li><a href="#">Download</a></li>
          <li className="right-links">
            <ul>
              <li>
                <select>
                  <option value="en">Language</option>
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                </select>
              </li>
              <li><button>Login</button></li>
            </ul>
          </li>
        </ul>
      </nav>
      <div className="center">
        <h2>Swipe Right</h2>
        <button>Create Account</button>
      </div>
      <div id="legal-careers">
        <div className="legal">
          <h2>Legal</h2>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Cookie Policy</a>
          <a href="#">Intellectual Property</a>
        </div>
        <div className="careers">
          <h2>Careers</h2>
          <a href="#">Careers Portal</a>
          <a href="#">Tech Blog</a>
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
          <a href="#">Destinations</a>
          <a href="#">Press Room</a>
          <a href="#">Contact</a>
          <a href="#">Promo Code</a>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
