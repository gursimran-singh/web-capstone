import React from 'react'
import '../css/contactus.css'
import '../css/css/fontawesome.css'
import '../css/css/brands.css'
import '../css/css/solid.css'

export default function Signup() {
  return (
      <div className='signup-wrap'>
    
      <div className="signup">
          <h3>Sign Up</h3>
          <form action="" className='signup-form'>
          <label htmlFor="fullname">Full Name</label><br />
            <input type="text" name="fullname" id="fullname" placeholder='Full Name' />
            <br />
            <label htmlFor="signup-">Email</label><br />
            <input type="email" name="signup-email" id="signup-email" placeholder='Email address' />
            <br />
            <label htmlFor="password">Password</label>
            <br />
            <input type="password" name='password' id="password" placeholder='Password' />
           <br />
           <label htmlFor="cfm-password">Confirm Password</label>
            <br />
            <input type="password" name='cfm-password' id="cfm-password" placeholder='Confirm Password' />
           <br />
            <input type="checkbox" name='terms' id="terms" value="term-agree" /><label htmlFor="terms">&nbsp;I agree the <a href=""><strong>Terms and Conditions</strong></a></label>
            <br />
            <input type="submit" value="Sign Up" id= "signup-btn"/>
            
          </form>
      </div>
     
      </div>
  )
}
