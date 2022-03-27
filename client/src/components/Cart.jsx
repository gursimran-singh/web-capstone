import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from "react";
import { changeCart } from "./slices/cartSlice";
import './contactus.css'
// let shopCart = [
//   {
//     id: 1,
//     name: "Salmon", //or numeric ID, Primary ID for dish, dish title/image/price can be retracted with this ID
//     quantity: 2,
//     image: "images/pizza.jpg",
//     price: 18.65,
//   }, //object of order, including title, quantity, unit price or total. Here is an example
//   {
//     id: 2,
//     name: "Grill",
//     quantity: 1,
//     image: "images/barbeque.png",
//     price: 22.4,
//   },
//   {
//     id: 3,
//     name: "Hamburger",
//     quantity: 4,
//     image: "images/burger.jpg",
//     price: 6.99,
//   },
// ];
// const shopCart = useSelector((state) => state.cart.value);
export default function Cart() {
  const shopCart = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();
  const removeItem = (id) => {
    const newList = shopCart.filter((e) => e.dishID !== id);
    dispatch(changeCart(newList));
  };

  const changeItem = (id, op, quantity) => {
    
    let newList = JSON.parse(JSON.stringify(shopCart));  
    let item = newList.find((e) => e.dishID === id);
    if (op === "add") {
      item.quantity += 1;
    } else if (op === "minus") {
      if (item.quantity >= 1) {
        item.quantity = item.quantity - 1;
      } else {
        item.quantity = 0;
      }
    } else if (op === "change") {
      item.quantity = parseInt(quantity);
    }
    dispatch(changeCart(newList));
  };

  function subTotal(cartList) {
    let sum = 0;
    for (let i = 0; i < cartList.length; i++) {
      sum += cartList[i].price * cartList[i].quantity;
    }
    return sum;
  }

  const checkout = (orderList) =>{
      console.log(orderList); // to handle order, update database
  }


    return (
      <div className="cart-wrap">
      <div className="cart">
        <h4>Shopping Cart</h4>
        <ul>
          {shopCart.map((item, index) => {
      
            return (
              <li key={index}>
                <div className="left-part">
                  <img src={"images/"+item.image} />
                </div>
                <div className="right-part">
                  <p>{item.name}</p>
                  <p>
                    <input
                      type="button"
                      name="reduce"
                      id="reduce"
                      value="-"
                      onClick={() => changeItem(item.dishID, "minus")}
                    />
                    <input
                      type="number"
                      name="order-qty"
                      id="order-qty"
                      size="5"
                      maxLength="5"
                      min="0" 
                      max="19"
                      value={item.quantity}
                      onChange={(e) =>
                        changeItem(item.dishID, "change", e.target.value)
                      }
                    />
                    <input
                      type="button"
                      name="add"
                      id="add"
                      value="+"
                      onClick={() => changeItem(item.dishID, "add")}
                    />
                  </p>
                  <p className="item-amount remove-btn">
                    {"$" + (item.quantity * item.price).toFixed(2)}
                    <button onClick={() => removeItem(item.dishID)}>Remove</button>
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="subtotal">
          <h4>
            Subtotal:&nbsp;
            <span className="item-amount">{"$" + subTotal(shopCart).toFixed(2)}</span>
          </h4>
        </div>
        <div className="chk-out">
            <button onClick={() => checkout(shopCart)}>Check Out</button>
        </div>
      </div>
      </div>
    );
  
}
