import React from 'react'
import '../css/contactus.css'
import {Link, Outlet} from "react-router-dom"
export default function Login() {
  return (
    
      <div className="al-login-wrap">
      <div className="al-login">
          <h3>Log In</h3>
          <form action="" className='login-form'>
            <label htmlFor="login-email">Email</label><br />
            <input type="email" name="login-email" id="login-email" placeholder='Email address' />
            <br />
            <label htmlFor="password">Password</label>
            <br />
            <input type="password" name='password' id="password" placeholder='Password' />
           <br />
            <input type="checkbox" name='keep-login' id="keep-login" value="keep_login" /><label htmlFor="keep-login">Keep me signed in</label>
            <br />
            <input type="submit" value="Log In" id= "submit-btn"/>
            <p>New to Food Delivery System? <Link to="/signup">Sign up</Link></p>
          </form>
      </div>
      <Outlet />
      </div>
    
  )
}