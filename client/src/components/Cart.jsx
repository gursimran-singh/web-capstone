import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from "react";
import { changeCart } from "./slices/cartSlice";
import './contactus.css'

export default function Cart() {
  const shopCart = useSelector((state) => state.cart.value);

  const dispatch = useDispatch();
  // console.log(shopCart);
  const removeItem = (id) => {
    const newList = shopCart.filter((e) => e.item_id !== id);
    dispatch(changeCart(newList));
  };
  
  const changeItem = (id, op, quantity) => {
    let newList = JSON.parse(JSON.stringify(shopCart));  
    let item = newList.find((e) => e.item_id === id);
    switch(op){
        case "add":
            if(item.quantity<999){
              item.quantity += 1;
             
            }
           
        break;
        case "minus":
          if (item.quantity >= 2) {
            item.quantity = item.quantity - 1;
          
          } else {
            item.quantity = 1;
            
          }
        break;
        case "change":
            item.quantity = parseInt(quantity);
        break;
        default:
        break;
    }

    dispatch(changeCart(newList));
  };

  function subTotal(cartList) {
    let sum = 0;
    for (let i = 0; i < cartList.length; i++) {
      sum += cartList[i].item_price * cartList[i].quantity;
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
                  <img src={"images/"+item.item_image} />
                </div>
                <div className="right-part">
                  <p>{item.item_name}</p>
                  <p>
                    <input
                      type="button"
                      name="reduce"
                      id="reduce"
                      value="-"
                      onClick={() => changeItem(item.item_id, "minus")}
                    />
                    <input
                      type="number"
                      name="quantity"
                      id="quantity"
                      value={item.quantity}
                      onChange={(e) =>
                        changeItem(item.item_id, "change", e.target.value)
                      }
                    />
                    <input
                      type="button"
                      name="add"
                      id="add"
                      value="+"
                      onClick={() => changeItem(item.item_id, "add")}
                    />
                  </p>
             
                  <p className="item-amount remove-btn">
                    {"$" + (item.quantity * item.item_price).toFixed(2)}
                    <button onClick={() => removeItem(item.item_id)}>Remove</button>
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
