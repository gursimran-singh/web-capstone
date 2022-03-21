import React from "react";
import '../css/contactus.css'
import '../css/css/fontawesome.css'
import '../css/css/brands.css'
import '../css/css/solid.css'

export default function Contactus() {
  return (

    <div className="contactus">
      <div className="contactus-top">
        <div className="content-area">
          <h1>Contact</h1>
        </div>
      </div>
      <div className="content">
        <div className="content-area lft-rgt-arrg">
          <div className="left-part contact-info">
            <ul>
              <li>
                <h4>
                  <i className="fas fa-map-marker-alt"></i>Location
                </h4>
                <span>288 Doon S Dr, Kitchener, ON N2P 2X2</span>
              </li>
              <li>
                <h4>
                  <i className="fas fa-envelope"></i>Email us
                </h4>
                <span>service@fooddeliverysystem.com</span>
              </li>
              <li>
                <h4>
                  <i className="fas fa-phone-alt"></i>Phone
                </h4>
                <span>(+1) 123-456-7890</span>
              </li>
              <li>
                <h4>
                  <i className="fas fa-clock"></i>Open Hours
                </h4>
                <span>Mon - Fri: 8am to 11pm </span><br />
                <span>Sat - Sun: 11am to 11pm</span>
              </li>
              <li className="social-media">
                <h4>Follow us</h4>
                <i className="fab fa-facebook-square"></i>
                <i className="fab fa-twitter-square"></i>
                <i className="fab fa-instagram-square"></i>
              </li>
            </ul>
          </div>
          <div className="right-part contact-form">
            <h3>How can we help you?</h3>
            <form action="">
              <input
                id="username"
                type="text"
                placeholder="Your name"
                name="username"
              />
              <input
                type="email"
                placeholder="Your email"
                name="email"
                id="email"
              />
              <br />
              <input
                type="text"
                placeholder="Subject"
                name="subject"
                id="subject"
              />
              <br />
              <textarea
                name="message-input"
                id="message-input"
                rows="10"
                placeholder="Enter your message"
              ></textarea>
              <br />
              <input type="submit" name="" id="submit-msg" value="Submit" />
            </form>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="content-area">
          <div className="map">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2899.7878028103855!2d-80.4313807846429!3d43.3814607791316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882c75664e09bd3f%3A0x77eef9c3b120957c!2s288%20Doon%20S%20Dr%2C%20Kitchener%2C%20ON%20N2P%202X2!5e0!3m2!1sen!2sca!4v1647491238579!5m2!1sen!2sca" width="100%"  style={{border:0}} allowFullScreen="" loading="lazy" title="location"></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
