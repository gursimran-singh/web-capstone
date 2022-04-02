import React, { useState } from "react";

import { useSelector , useDispatch } from "react-redux";
import { resetCart } from "./slices/cartSlice";
import { Formik, Field, Form, ErrorMessage } from "formik"
import * as Yup from "yup";
// import { useEffect } from "react";

import "bootstrap/dist/css/bootstrap.css";
import "./contactus.css";
import { Navigate, Link} from "react-router-dom";
import axios from "axios";

const ORDER_URL = "https://6fdhemeqha.execute-api.ca-central-1.amazonaws.com/dev/api/order/";
let order_id;
let total_price;
export default function Checkout() {
  const dishList = useSelector((state) => state.cart.dishList);
  const loggedIn = useSelector((state)=>state.auth.loggedIn);
  const dispatch = useDispatch();
  const [submitOrder, setSubmitOrder] = useState(false);
  // const [paymentSec, setPaymentSec] = useState(false);


  
  const initialValues = {
    address: "",
    city: "",
    state:"",
    postcode: "",
    firstname: "",
    lastname: "",
    phone:"",
  
  };
  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("Frist name is required!"),
    lastname: Yup.string().required("Last name is required!"),
    city: Yup.string().required("City is Required"),
    postcode: Yup.string().required("Post code is required"),
    phone: Yup.string().required("Phone number is required"),
    address: Yup.string().required("Address is required"),
    state: Yup.string().required("State is required"),
  });
  
  

  function subTotal(cartList) {
    let sum = 0;
    for (let i = 0; i < cartList.length; i++) {
      sum += cartList[i].item_price * cartList[i].quantity;
    }
    return sum;
  }
  let totalQty = 0;
  for (let i = 0; i < dishList.length; i++) {
    totalQty += dishList[i].quantity;
  }
  const shippingFee = 7 * Math.floor(totalQty/10+1);

  let totalAmount = Math.round((shippingFee + subTotal(dishList))*100/100);



  const placeOrder = (submitVal) => {

    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    let order_date = new Date()
    // console.log(JSON.stringify(dishList));
    // console.log(submitVal);
    // console.log(storedUser);
    // let order={};
    // const dish_list = JSON.stringify(dishList);
    let dish_list = JSON.stringify(dishList);
    // console.log(order.dish_list);
   let  user_id = storedUser.user.id;
    order_date = order_date.toLocaleString();
   let address = submitVal.address+ ", " + submitVal.city + ", " + submitVal.state + " " + submitVal.postcode;
   let customer_name = submitVal.firstname + " " + submitVal.lastname;
   let phone = submitVal.phone;
   let payment_status= "false";
   total_price = totalAmount.toString();
   let delivery_date = order_date.toLocaleString();
  //  let id="ddd";
    // console.log(order);
   
    axios.post(ORDER_URL, {
      dish_list,
      order_date,
      address,
      customer_name,
      phone,
      user_id,
      payment_status,
      total_price,
      delivery_date,
    })
    .then((res) =>{
      // console.log(res);
      order_id = res.data.order.id;
      // console.log(order_id);
      dispatch(resetCart());
      setSubmitOrder(true);
    }).catch((error)=>{
      console.log(error);
    });

    
  };

 if(submitOrder && order_id && total_price){
   
  return <Navigate to="/payment" state={{order_id: order_id, total_price: total_price}}/>;
 }
  if(!loggedIn){
    return <Navigate to="/login" />;
  }
  if (dishList.length === 0 && !submitOrder) {
    return (
      <div className="checkout">
      <div className="alcontent">
        <div className="alcontent-area">
          <h3>Check Out</h3>
          <p>There is no dish in your cart. Let's go to get some food.</p>
          <p>
            <Link to="/menu">Menu</Link>
          </p>
        </div>
      </div>
      </div>
    );
  }
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

                    <div style={{margin:"0 1rem"}}>
                      <label htmlFor="state">
                        State <span className="star">*</span>
                      </label>
                      <br />
                      <Field
                        type="text"
                        name="state"
                      />
                      <br />
                      <ErrorMessage
                        name="state"
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
