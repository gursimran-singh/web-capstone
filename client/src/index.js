import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Contactus from './components/Contactus';
import Menu from  './components/Menu';
import Cart from "./components/Cart";


ReactDOM.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
     
        <Route index element={<Homepage />}></Route>
        <Route path="homepage" element={<Homepage />}></Route>
        <Route path="menu" element={<Menu/>}></Route>
        <Route path="contactus" element={<Contactus />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="signup" element={<Signup />}></Route>
        <Route path="cart" element={<Cart />}></Route>
        <Route path='*' element={
          <main style={{ padding: "1rem", fontSize:"1.25rem" }}>
            <p className="main">Page Not Found.</p>
          </main>
        } />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();