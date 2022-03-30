import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import "bootstrap/dist/css/bootstrap.css";
import "./contactus.css";

const initialValues = {
  address: "",
  city: "",
  postcode: "",
  firstname: "",
  lastname: "",
  phone:"",
  email:"",
};
const validationSchema = Yup.object().shape({
  firstname: Yup.string().required("Frist name is required!"),
  email: Yup.string()
    .email("This is not a valid email.")
    .required("Email address is required!"),
  lastname: Yup.string().required("Last name is required!"),
  city: Yup.string().required("City is Required"),
  postcode: Yup.string().required("Post code is required"),
  phone: Yup.string().required("Phone number is required"),
  address: Yup.string().required("Address is required"),
});

export default function Checkout() {
  const dishList = useSelector((state) => state.cart.dishList);
  const [city, setCity] = useState("");

  function subTotal(cartList) {
    let sum = 0;
    for (let i = 0; i < cartList.length; i++) {
      sum += cartList[i].item_price * cartList[i].quantity;
    }

    return sum;
  }
  const shippingFee = dishList.length === 0 ? 0 : 7;
  console.log(subTotal(dishList));
  let totalAmount = (shippingFee + subTotal(dishList)).toFixed(2);

  const placeOrder = () => {};

  return (
    <div className="checkout">
      <div className="alcontent">
        <div className="alcontent-area">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={placeOrder}
          >
            <Form className="billing-form lft-rgt-arrg">
              <div className="left-part">
                <h3>Bill Details</h3>
                <div className="billing-form">
                  <div>
                    <p>
                      <label htmlFor="address">
                        Address <span className="star">*</span>
                      </label>
                      <br />
                      <Field type="text" name="address" />
                    </p>
                    <ErrorMessage
                      name="address"
                      component="p"
                      className="alert alert-danger"
                    />
                  </div>
                  <div className="city-wrap">
                    <div>
                      <label htmlFor="city">
                        City <span className="star">*</span>
                      </label>
                      <br />
                      <Field
                        type="text"
                        name="city"
                        
                      />
                      <br />
                      <ErrorMessage
                        name="city"
                        component="p"
                        className="alert alert-danger"
                      />
                    </div>

                    <div>
                      <label htmlFor="postcode">
                        Post Code/ZIP <span className="star">*</span>
                      </label>
                      <br />
                      <Field type="text" name="postcode" />
                      <br />
                      <ErrorMessage
                        name="postcode"
                        component="p"
                        className="alert alert-danger"
                      />
                    </div>
                  </div>
                  <div className="name-wrap">
                    <div>
                      <label htmlFor="firstname">
                        First Name <span className="star">*</span>
                      </label>
                      <br />
                      <Field type="text" name="firstname" />
                      <br />
                      <ErrorMessage
                        name="firstname"
                        component="p"
                        className="alert alert-danger"
                      />
                    </div>

                    <div>
                      <label htmlFor="lastname">
                        Last Name <span className="star">*</span>
                      </label>
                      <br />
                      <Field type="text" name="lastname" />
                      <br />
                      <ErrorMessage
                        name="lastname"
                        component="p"
                        className="alert alert-danger"
                      />
                    </div>
                  </div>
                  <div>
                    <p>
                      <label htmlFor="phone">
                        Phone <span className="star">*</span>
                      </label>
                      <br />
                      <Field type="text" name="phone" />
                    </p>
                    <ErrorMessage
                      name="phone"
                      component="p"
                      className="alert alert-danger"
                    />
                  </div>
                  <div>
                    <p>
                      <label htmlFor="email">
                        Email <span className="star">*</span>
                      </label>
                      <br />
                      <Field type="email" name="email" />
                    </p>
                    <ErrorMessage
                      name="email"
                      component="p"
                      className="alert alert-danger"
                    />
                  </div>
                </div>
              </div>
              <div className="right-part">
                <h3>Your Order</h3>

                <table>
                  <thead>
                    <tr>
                      <td>Dish</td>
                      <td>Quantity</td>
                      <td>Total</td>
                    </tr>
                  </thead>
                  <tbody>
                    {dishList.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.item_name}</td>
                          <td>{item.quantity}</td>
                          <td>
                            {"$" + (item.quantity * item.item_price).toFixed(2)}
                          </td>
                        </tr>
                      );
                    })}
                    <tr>
                      <td>Shipping</td>
                      <td></td>
                      <td>{"$" + shippingFee}</td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "end" }} colSpan="2">
                        <strong>Order Total</strong>
                      </td>
                      <td>{"$" + totalAmount}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="place_order"> 
                  <input
                    type="submit"
                    className="btn_order"
                    value="Place order"
                  />
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}
