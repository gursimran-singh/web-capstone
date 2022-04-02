import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Contactus from './components/Contactus';
import Menu from './components/Menu';
import Food from './components/Food';
import Cart from "./components/Cart";
import store from "./components/store"
import Checkout from "./components/Checkout"
import Emailsent from './components/Emailsent';
import { Provider } from "react-redux"
import Payment  from "./components/Payment"

ReactDOM.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>

          <Route index element={<Homepage />}></Route>
          <Route path="homepage" element={<Homepage />}></Route>
          <Route path="menu" element={<Menu />}></Route>
          <Route path="food/:id" element={<Food/>}></Route>
          <Route path="contactus" element={<Contactus />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="signup" element={<Signup />}></Route>
          <Route path="cart" element={<Cart />}></Route>
          <Route path="checkout" element={<Checkout />}></Route>
          <Route path="emailsent" element={<Emailsent />}></Route>
          <Route path="payment" element={<Payment />}></Route>
          <Route path='*' element={
            <main style={{ padding: "1rem", fontSize: "1.25rem", minHeight:"80vh",}}>
              <p className="main">Page Not Found.</p>
            </main>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
