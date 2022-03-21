import React from "react";
import samplePic from "../assets/salmon.jpg";
import samplePic2 from "../assets/grill.jpg";
import samplePic3 from "../assets/hamburger.jpg";
import { useState } from "react";
import Cart from "./Cart";
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
export default function Checkout() {
  const [list, setList] = useState(shopCart);
  function subTotal(cartList) {
    let sum = 0;
    for (let i = 0; i < cartList.length; i++) {
      sum += cartList[i].price * cartList[i].quantity;
    }
    return sum;
  }
  const shippingFee = 7;
  let totalAmount = (shippingFee + subTotal(list)).toFixed(2);
  return (
    <div className="checkout">
      <div className="content">
        <div className="content-area lft-rgt-arrg">
          <div className="left-part">
            <h3>Bill Details</h3>
            <div className="billing-form">
              <div>
                <p>
                  <label htmlFor="address">
                    Address <span className="star">*</span>
                  </label>
                  <br />
                  <input type="text" id="address" name="address" />
                </p>
              </div>
              <div className="city-wrap">
                <p>
                  <label htmlFor="city">
                    City <span className="star">*</span>
                  </label>
                  <br />
                  <select id="city" name="city" defaultValue="Waterloo">
                    <option value="Waterloo">
                      Waterloo
                    </option>
                    <option value="Kitchener">Kitchener</option>
                    <option value="Cambridge">Cambridge</option>
                  </select>
                </p>
                <p>
                  <label htmlFor="post-code">
                    Post Code/ZIP <span className="star">*</span>
                  </label>
                  <br />
                  <input type="text" id="post-code" name="post-code" />
                </p>
              </div>
              <div className="name-wrap">
                <p>
                  <label htmlFor="first-name">
                    First Name <span className="star">*</span>
                  </label>
                  <br />
                  <input type="text" id="first-name" name="first-name" />
                </p>
                <p>
                  <label htmlFor="last-name">
                    Last Name <span className="star">*</span>
                  </label>
                  <br />
                  <input type="text" id="last-name" name="last-name" />
                </p>
              </div>
              <div>
                <p>
                  <label htmlFor="chk-phone">
                    Phone <span className="star">*</span>
                  </label>
                  <br />
                  <input type="text" id="chk-phone" name="chk-phone" />
                </p>
              </div>
              <div>
                <p>
                  <label htmlFor="chk-email">
                    Email <span className="star">*</span>
                  </label>
                  <br />
                  <input type="email" id="chk-email" name="chk-email" />
                </p>
              </div>
            </div>
          </div>
          <div className="right-part">
            <h3>Your Order</h3>

            <table>
              <thead>
                <tr>
                  <td>Dish</td>
                  <td>Total</td>
                </tr>
              </thead>
              <tbody>
                {
                list.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.dishTitle}</td>
                      <td>{"$" + (item.quantity * item.price).toFixed(2)}</td>
                    </tr>
                  );
                })
                }
                 <tr>
                  <td>Shipping</td>
                  <td>{shippingFee}</td>
                </tr>
                <tr>
                  <td>&nbsp;</td>
                  <td>Order Total &nbsp;
                    {
                      '$'+totalAmount
                    }
                  </td>
                </tr>
              </tbody>
            </table>
            <ul className="order-sum">
              <li></li>
            </ul>
            <ul className="payment">
              <li></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
