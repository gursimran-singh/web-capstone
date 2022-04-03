import React, { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import "bootstrap/dist/css/bootstrap.css";
import "./contactus.css";

const PAY_URL =
  "https://6fdhemeqha.execute-api.ca-central-1.amazonaws.com/dev/api/payment/";
const ORDERPUT_URL =
  "https://6fdhemeqha.execute-api.ca-central-1.amazonaws.com/dev/api/order/id";

export default function Payment() {
  const location = useLocation();
  const [paymentStatus, setPaymentStatus] = useState(false);
  let { order_id, total_price } = location.state;
  const [amount, setAmount] = useState(total_price);

  // console.log(order_id, total_price);
  const initialValues = {
    cardNumber: "",
    expMonth: "",
    expYear: "",
    cvc: "",
    
  };
  let date = new Date();
  let currentYear = parseInt(date.getFullYear().toString().slice(-2));
  let currentMonth = date.getMonth() + 1;

  const validationSchema = Yup.object().shape({
    cardNumber: Yup.string()
      .required("Card number is required!")
      .matches(/^([\d]{16,20})$/gm, "Expired year should have 16 to 20 digits"),
    expYear: Yup.string()
      .required("An expiration year is required!")
      .matches(/^([\d]{2})$/gm, "Expired year should have 2 digits")
      .test(
        "year",
        "The expiration year should be in this year or year later",
        (val) => parseInt(val) >= currentYear
      ),
    expMonth: Yup.string()
      .required("An expiration month is required!")
      .matches(/^(0[1-9]|1[0-2])$/gm, "Expired year should be Jan to Dec")
      .when("expYear", (expYear) => {
        if (parseInt(expYear) === currentYear) {
          return Yup.string()
            .test(
              "month",
              "The expiration month should be in the future.",
              (val) => parseInt(val) >= currentMonth
            )
            .required("The expiration month is required!")
            .matches(
              /^(0[1-9]|1[0-2])$/gm,
              "Expired year should be Jan to Dec"
            );
        }
      }),

    cvc: Yup.string()
      .required("Cvc code is required")
      .matches(/^([\d]{3})$/gm, "Cvc code should have 3 digits"),
  });

  const handleSignup = (submitVal , {resetForm}) => {
    if (order_id && total_price) {
      const { cardNumber, expMonth, expYear, cvc } = submitVal;
      const amount = total_price;
      axios
        .post(PAY_URL, { cardNumber, expMonth, expYear, cvc, amount })
        .then((res) => {
            console.log(res.data.charges.data[0].receipt_url);
            total_price = "";
            resetForm(initialValues);
            setAmount('');
            window.open( res.data.charges.data[0].receipt_url);
            axios.put(ORDERPUT_URL+":"+order_id, {payment_status: true})
            .then((res) =>{
                if(res.data.Attributes.payment_status){
                    setPaymentStatus(true);
                }
            }).catch((error) =>{
                console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  if(paymentStatus){
      return <Navigate to="/homepage" />;
  }
  return (
    <div className="payment-wrap">
      <div className="payment">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSignup}
        >
          <Form className="payment-form">
            <div>
              <div className="form-group">
                <label htmlFor="cardNumber">Card Number</label>
                <Field name="cardNumber" type="text" className="form-control" />
                <ErrorMessage
                  name="cardNumber"
                  component="p"
                  className="alert alert-danger"
                />
              </div>

              <div className="date-wrap">
                <div className="form-group">
                  <label htmlFor="expYear">Expired Year</label>
                  <Field name="expYear" type="text" className="form-control" />
                  <ErrorMessage
                    name="expYear"
                    component="p"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group exp-month">
                  <label htmlFor="expMonth">Expired Month</label>
                  <Field name="expMonth" type="text" className="form-control" />
                  <ErrorMessage
                    name="expMonth"
                    component="p"
                    className="alert alert-danger"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cvc">cvc</label>
                  <Field name="cvc" type="text" className="form-control" />
                  <ErrorMessage
                    name="cvc"
                    component="p"
                    className="alert alert-danger"
                  />
                </div>
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  //   className="btn btn-primary btn-block"
                  id="payment-btn"
                  value={"Pay"+ (amount && (" $" + amount))}
                />
              </div>
            </div>
          </Form>
        </Formik>
      </div>
      <h2 className="disclaimer">
        Disclaimer: This website do-not sell any product. The payment gateway is
        purely for educational and demonstration purposes only. If you are a
        visitor to website. Please do-not proceed to pay. Owners of this website
        will not be liable for any kind of transaction.
      </h2>
    </div>
  );
}
