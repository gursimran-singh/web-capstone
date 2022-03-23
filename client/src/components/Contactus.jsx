import React from "react";
import '../css/contactus.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitterSquare } from "@fortawesome/free-brands-svg-icons";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { faInstagramSquare } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { useDebouncedCallback } from 'use-debounce';
 
export default function Contactus() {

  const [username, setUsername]=useState();
  const [email, setEmail]=useState();
  const [messageInput, setMessageInput]=useState();
  const [subject, setSubject]=useState();

  const debounced = useDebouncedCallback(
    (value)=>{
      setUsername(value)
      console.log(username);
    }
    , 500);

  const submitHandler = ()=>{
      console("hello")
  }

 

  return (
    <>
 
    <div className="contactus">
      <div className="contactus-top">
        <div className="alcontent-area">
          <h1>Contact</h1>
        </div>
      </div>
      <div className="alcontent">
        <div className="alcontent-area lft-rgt-arrg">
          <div className="left-part contact-info">
            <ul>
              <li>
                <h4>
                <FontAwesomeIcon icon={faMapMarkedAlt} className = "info-icon"/>Location
                </h4>
                <span>288 Doon S Dr, Kitchener, ON N2P 2X2</span>
              </li>
              <li>
                <h4>
                <FontAwesomeIcon icon={faEnvelope} className = "info-icon"/>Email us
                </h4>
                <span>service@fooddeliverysystem.com</span>
              </li>
              <li>
                <h4>
                <FontAwesomeIcon icon={faPhone} className = "info-icon"/>Phone
                </h4>
                <span>(+1) 123-456-7890</span>
              </li>
              <li>
                <h4>
                <FontAwesomeIcon icon={faClock} className = "info-icon"/>Open Hours
                </h4>
                <span>Mon - Fri: 8am to 11pm </span><br />
                <span>Sat - Sun: 11am to 11pm</span>
              </li>
              <li className="social-media">
                <h4>Follow us</h4>
                <FontAwesomeIcon icon={faFacebookSquare} className = "social-icon"/>
                <FontAwesomeIcon icon={faTwitterSquare} className = "social-icon"/>
                <FontAwesomeIcon icon={faInstagramSquare} className = "social-icon"/>     
              </li>
            </ul>
          </div>
          <div className="right-part contact-form">
            <h3>How can we help you?</h3>
            <form id="contactForm" method="POST" onSubmit={submitHandler}>
              <input
                id="username"
                type="text"
                placeholder="Your name"
                name="username"
                value={username}
                onChange ={ (e) =>debounced(e.target.value)}
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
      <div className="alcontent">
        <div className="alcontent-area">
          <div className="map">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2899.7878028103855!2d-80.4313807846429!3d43.3814607791316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882c75664e09bd3f%3A0x77eef9c3b120957c!2s288%20Doon%20S%20Dr%2C%20Kitchener%2C%20ON%20N2P%202X2!5e0!3m2!1sen!2sca!4v1647491238579!5m2!1sen!2sca" width="100%"  style={{border:0}} allowFullScreen="" loading="lazy" title="location"></iframe>
          </div>
        </div>
      </div>
    </div>
  
    </>
  );
}
