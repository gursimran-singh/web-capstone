import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { signup } from "./slices/authSlice";
import { clearMessage } from "./slices/messageSlice";

import "bootstrap/dist/css/bootstrap.css";
import "./contactus.css";

export default function Signup() {
  const [successful, setSuccessful] = useState(false);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    name: "",
    email: "",
    password: "",
    cfm_password: "",
    terms: false,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .test(
        "len",
        "The username must be between 3 and 20 characters.",
        (val) =>
          val && val.toString().length >= 3 && val.toString().length <= 20
      )
      .required("This field is required!"),
    email: Yup.string()
      .email("This is not a valid email.")
      .required("This field is required!"),
    password: Yup.string()
      .test(
        "len",
        "The password must be between 6 and 40 characters.",
        (val) =>
          val && val.toString().length >= 6 && val.toString().length <= 40
      )
      .required("This field is required!"),
    cfm_password: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "Password must match"),
    terms: Yup.boolean()
      .default(false)
      .required("Agree terms is required")
      .oneOf([true], "Terms should be agreed."),
  });

  const handleRegister = (formValue) => {
    // console.log(formValue);
    const { name, email, password } = formValue;
    // console.log(username + "---" + email + "----" + password);

    setSuccessful(false);

    dispatch(signup({ name, email, password }))
      .unwrap()
      .then((res) => {
        // console.log(res);
        if (res.hasOwnProperty("user")) {
          setSuccessful(true);
        } else {
          setSuccessful(false);
        }
      })
      .catch(() => {
        setSuccessful(false);
      });
  };

  return (
    <div className="signup-wrap">
      <div className="signup">
        <h3>Sign Up</h3>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          <Form className="signup-form">
            {!successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="name">Username</label>
                  <Field name="name" type="text" className="form-control" />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Field name="email" type="email" className="form-control" />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Field
                    name="password"
                    type="password"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cfm_password">Confirm Password</label>
                  <Field
                    name="cfm_password"
                    type="password"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="cfm_password"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group term-chk">
                  <Field
                    name="terms"
                    type="checkbox"
                    id="terms"
                    // className="form-control"
                  />{" "}
                  <label htmlFor="terms">
                    &nbsp;I agree the
                    <a href="#">
                      <strong>Terms and Conditions</strong>
                    </a>
                  </label>
                  <ErrorMessage
                    name="terms"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <input
                    type="submit"
                    className="btn btn-primary btn-block"
                    id="signup-btn"
                    value="Sign Up"
                  />
                </div>
              </div>
            )}
          </Form>
        </Formik>
        {message && (
          <div className="signup-form form-group">
            <div
              className={
                successful ? "alert alert-success" : "alert alert-danger"
              }
              role="alert"
            >
              <p> {message}</p>
              
               
              
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
