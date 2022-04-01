import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./contactus.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitterSquare } from "@fortawesome/free-brands-svg-icons";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { faInstagramSquare } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";

import { Formik, Field, Form, ErrorMessage} from "formik";
import * as Yup from "yup";
import { Navigate } from "react-router-dom";

export default function Contactus() {
  const [isSent, setIsSent] = useState(false);
  const initialValues = {
    username: "",
    email: "",
    subject: "",
    message: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
            .required("Name is required!"),
    email: Yup.string()
      .email("This is not a valid email.")
      .required("Email address is required!"),
    subject: Yup.string()
      .required("Subject is required!"),
    message: Yup.string()
      .required("Message is required"),
    
  });

  const submitHandler = (submitVal, {resetForm}) => {
    console.log(submitVal);
    // alert("Thank you very much for contacting us. We will reply to your email as soon as possible.")
    resetForm(initialValues);
    setIsSent(true);
  };
  if(isSent){
    return <Navigate to="/emailsent" />;
  }

  return (
    <>
      <div className="contactus">
        <div id="contact-banner">
          <div className="banner-text">
            <h1>contact us</h1>
            <p>For any questions Email or Call us at:</p>
            <p>
              <FontAwesomeIcon icon={faEnvelope} /> : contact@cuisine.com
            </p>
            <p>
              <FontAwesomeIcon icon={faPhone} /> : 983-383-3983
            </p>
          </div>
        </div>

        <div className="alcontent">
          <div className="alcontent-area lft-rgt-arrg">
            <div className="left-part contact-info">
              <ul>
                <li>
                  <h4>
                    <FontAwesomeIcon
                      icon={faMapMarkedAlt}
                      className="info-icon"
                    />
                    Location
                  </h4>
                  <span>288 Doon S Dr, Kitchener, ON N2P 2X2</span>
                </li>
                <li>
                  <h4>
                    <FontAwesomeIcon icon={faEnvelope} className="info-icon" />
                    Email us
                  </h4>
                  <span>contact@cuisine.com</span>
                </li>
                <li>
                  <h4>
                    <FontAwesomeIcon icon={faPhone} className="info-icon" />
                    Phone
                  </h4>
                  <span>(+1) 983-383-3983</span>
                </li>
                <li>
                  <h4>
                    <FontAwesomeIcon icon={faClock} className="info-icon" />
                    Open Hours
                  </h4>
                  <span>Mon - Fri: 8am to 11pm </span>
                  <br />
                  <span>Sat - Sun: 11am to 11pm</span>
                </li>
                <li className="social-media">
                  <h4>Follow us</h4>
                  <FontAwesomeIcon
                    icon={faFacebookSquare}
                    className="social-icon"
                  />
                  <FontAwesomeIcon
                    icon={faTwitterSquare}
                    className="social-icon"
                  />
                  <FontAwesomeIcon
                    icon={faInstagramSquare}
                    className="social-icon"
                  />
                </li>
              </ul>
            </div>
            <div className="right-part contact-form">
              <h3>How can we help you?</h3>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={submitHandler}
              >
                <Form id="contactForm">
                  <div className="contact-info-wrap">
                    <div>
                      <Field
                        className="input"
                        type="text"
                        placeholder="Your name"
                        name="username"
                        id = "username"
                      />
                      <ErrorMessage
                        name="username"
                        component="p"
                        className="alert alert-danger"
                      />
                    </div>
                    <div>
                      <Field
                        className="input"
                        type="email"
                        placeholder="Your email"
                        name="email"
                        id="email"
                      />
                      <ErrorMessage
                        name="email"
                        component="p"
                        className="alert alert-danger"
                      />
                    </div>
                  </div>
                  <div>
                    <Field
                      className="input"
                      type="text"
                      placeholder="Subject"
                      name="subject"
                      id="subject"
                    />
                    <ErrorMessage
                      name="subject"
                      component="p"
                      className="alert alert-danger"
                    />
                  </div>
                  <div>
                    <Field
                      className="input"
                      as="textarea"
                      name="message"
                      type="text"
                      rows="8"
                      placeholder="Enter your message"
                      id = "message"
                    />
                    <ErrorMessage
                      name="message"
                      component="p"
                      className="alert alert-danger"
                    />
                  </div>
                  <input
                    type="submit"
                    name="submit"
                    id="submit-msg"
                    value="Submit"
                  />
                </Form>
              </Formik>
            </div>
          </div>
        </div>
        <div className="alcontent bg-light">
          <div className="alcontent-area">
            <div className="map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2899.7878028103855!2d-80.4313807846429!3d43.3814607791316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882c75664e09bd3f%3A0x77eef9c3b120957c!2s288%20Doon%20S%20Dr%2C%20Kitchener%2C%20ON%20N2P%202X2!5e0!3m2!1sen!2sca!4v1647491238579!5m2!1sen!2sca"
                width="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
