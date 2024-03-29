import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
  dishChange,
  dishAdd,
  dishRemove,
  removeDishFromCart,
  initDishList,
} from "./slices/cartSlice";
import "./contactus.css";
import { Link, Navigate } from "react-router-dom";

export default function Cart() {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const dishList = useSelector((state) => state.cart.dishList);
  const dispatch = useDispatch();
  const [isChkout, setIsChkout] = useState(false);
  const [loginStatus, setLoginStatus] = useState(true);
  

  function subTotal(cartList) {
    let sum = 0;
    for (let i = 0; i < cartList.length; i++) {
      sum += cartList[i].item_price * cartList[i].quantity;
    }
    return sum;
  }

  const checkout = () => {
    if (loggedIn) {
      setLoginStatus(true);
      if (dishList.find((e) => e.quantity === 0)) {
        alert(
          "There is some dish with 0 quantity. Please remove the dish from the cart."
        );
      } else {
        setIsChkout(true);
      }
    }
    else{
      setLoginStatus(false);
    }
  };

  useEffect(()=>{
    dispatch(initDishList());
  }, []);
  if(!loginStatus){
    alert("Please login before check out");
    return <Navigate to='/login' />;
  }

  if (isChkout) {
    return <Navigate to="/checkout" />;
  }
  if (dishList.length === 0) {
    return (
      <div className="cart-wrap">
        <div className="cart">
          <h3>Shopping Cart</h3>
          <p>There is no dish in your cart. Let's go to get some food.</p>
          <p>
            <Link to="/menu">Menu</Link>
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="cart-wrap">
      <div className="cart" style={{backgroundColor: "white", padding:"20px"}}>
        <h3>Shopping Cart</h3>
        <ul >
          {dishList.map((item, index) => {
            return (
              <li style={{borderBottom: "1px solid black"}} key={item.item_id}>
                <div className="left-part">
                  <img src={item.item_image} alt=""/>
                </div>
                <div className="right-part">
                  <p>{item.item_name}</p>
                  <p>
                    <input
                      type="button"
                      name="reduce"
                      // id="reduce"
                      value="-"
                      className="btn btn-secondary"
                      onClick={
                        () => dispatch(dishRemove(item.item_id))
                        // changeItem(item.item_id, "minus")
                      }
                    />
                    <input
                      name="quantity"
                      value={item.quantity}
                      style={{margin: "5px"}}
                      onChange={
                        (e) => {
                          let quantity = parseInt(e.target.value);
                          if (isNaN(quantity)) {
                            quantity = 0;
                          }
                          dispatch(
                            dishChange({ item_id: item.item_id, quantity })
                          );
                        }
                        // changeItem(item.item_id, "change", e.target.value)
                      }
                    />
                    <input
                      type="button"
                      name="add"
                      id="add"
                      value="+"
                      className="btn btn-secondary"
                      onClick={
                        () => dispatch(dishAdd(item.item_id))
                        //changeItem(item.item_id, "add")
                      }
                    />
                  </p>
                  <p className="item-amount remove-btn">
                    {"$" + (item.quantity * item.item_price).toFixed(2)}
                    <button className="btn btn-danger"
                      onClick={
                        () => dispatch(removeDishFromCart(item.item_id))
                        // removeItem(item.item_id)
                      }
                    >
                      Remove
                    </button>
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="subtotal text-center">
          <h4>
            Subtotal:&nbsp;
            <span className="item-amount">
              {"$" + subTotal(dishList).toFixed(2)}
            </span>
          </h4>
        </div>
        <div className="text-center pt-3">
          <button className="btn btn-red" onClick={checkout}>Check Out</button>
        </div>
      </div>
    </div>
  );
}
