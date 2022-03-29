import React, { useState, useEffect  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { login } from "./slices/authSlice";
import { clearMessage } from "./slices/messageSlice";
import {Link, Outlet} from "react-router-dom"

import "bootstrap/dist/css/bootstrap.css";
import './contactus.css'

export default function Login() {
  const [status, setStatus] = useState(false);
  const  message  = useSelector((state) => state.message.message);
  // const token =useSelector((state) => state.auth.token);
  // console.log(token);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
    .email("This is not a valid email.")
    .required("Email is required!"),
    password: Yup.string().test(
      "len",
      "The password must be between 6 and 30 characters.",
      (val) =>
        val && val.toString().length >= 6 && val.toString().length <= 30
    ).required("Password is required!"),
  });

  const handleLogin = (submitVal) => {
    const { email, password } = submitVal;
    setStatus(true);

    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        setStatus(false);
      })
      .catch(() => {
        setStatus(false);
      });
  };

  if (JSON.parse(sessionStorage.getItem("user"))) {
    return <Navigate to="/menu" />;
  }

  return (
    
      <div className="al-login-wrap">
      <div className="al-login">
          <h3>Log In</h3>
          <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field name="email" type="email" className="form-control" />
              <ErrorMessage
                name="email"
                component="p"
                className="alert alert-danger"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" className="form-control" />
              <ErrorMessage
                name="password"
                component="p"
                className="alert alert-danger"
              />
            </div>
            
            <p>New to Food Delivery System? <Link to="/signup">Sign up</Link></p>
            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block" disabled={status} id="submit-btn">
                {status && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
            </div>
            
          </Form>
        </Formik>
        {message && (
        <div className="form-group">
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        </div>
      )}
      </div>
      <Outlet />
      </div>
    
  )
}
