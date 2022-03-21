import React from "react";
import samplePic from "../assets/salmon.jpg";
import samplePic2 from "../assets/grill.jpg";
import samplePic3 from "../assets/hamburger.jpg";
import { useState } from "react";
let shopCart = [
  {
    id: 1,
    dishTitle: "Salmon", //or numeric ID, Primary ID for dish, dish title/image/price can be retracted with this ID
    quantity: 2,
    image: samplePic,
    price: 18.65,
  }, //object of order, including title, quantity, unit price or total. Here is an example
  {
    id: 2,
    dishTitle: "Grill",
    quantity: 1,
    image: samplePic2,
    price: 22.4,
  },
  {
    id: 3,
    dishTitle: "Hamburger",
    quantity: 4,
    image: samplePic3,
    price: 6.99,
  },
];
export default function Cart() {
  const [list, setList] = useState(shopCart);
  const removeItem = (id) => {
    const newList = list.filter((e) => e.id !== id);
    setList(newList);
  };

  const changeItem = (id, op, quantity) => {
    const newList = [...list];
    const item = newList.find((e) => e.id === id);
    if (op === "add") {
      item.quantity = item.quantity + 1;
    } else if (op === "minus") {
      if (item.quantity >= 1) {
        item.quantity = item.quantity - 1;
      } else {
        item.quantity = 0;
      }
    } else if (op === "change") {
      item.quantity = quantity;
    }
    setList(newList);
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
      <div className="cart">
        <h4>Shopping Cart</h4>
        <ul>
          {list.map((item, index) => {
            // setQty([...quantity, item.quantity]);

            return (
              <li key={index}>
                <div className="left-part">
                  <img src={item.image} />
                </div>
                <div className="right-part">
                  <p>{item.dishTitle}</p>
                  <p>
                    <input
                      type="button"
                      name="reduce"
                      id="reduce"
                      value="-"
                      onClick={() => changeItem(item.id, "minus")}
                    />
                    <input
                      type="number"
                      name="order-qty"
                      id="order-qty"
                      size="5"
                      maxLength="5"
                      value={item.quantity}
                      onChange={(e) =>
                        changeItem(item.id, "change", e.target.value)
                      }
                    />
                    <input
                      type="button"
                      name="add"
                      id="add"
                      value="+"
                      onClick={() => changeItem(item.id, "add")}
                    />
                  </p>
                  <p className="item-amount remove-btn">
                    {"$" + (item.quantity * item.price).toFixed(2)}
                    <button onClick={() => removeItem(item.id)}>Remove</button>
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="subtotal">
          <h4>
            Subtotal:&nbsp;
            <span className="item-amount">{"$" + subTotal(list).toFixed(2)}</span>
          </h4>
        </div>
        <div className="chk-out">
            <button onClick={() => checkout(list)}>Check Out</button>
        </div>
      </div>
    );
  
}
