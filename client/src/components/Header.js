import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/js/dist/carousel';
import 'bootstrap/js/src/collapse';
import './main.css';

import {Link, Outlet} from 'react-router-dom'

function Header(){
  return (
      <>
    <header>
            <div>
                <nav className="navbar navbar-expand-lg navbar-light">
                    <div className="container-fluid">
                    <Link to="/homepage" className="nav-item nav-link"><img src="images/logo.png"/></Link>
                        <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarCollapse">
                            <div className="navbar-nav ms-auto">
                              
                                <Link to="/homepage" className="nav-item nav-link">Home</Link>
                                <Link to="/menu" className="nav-item nav-link">Menu</Link>
                                <Link to="/contactus" className="nav-item nav-link">Contact</Link>
                                <Link to="/login" className="nav-item nav-link login">Login</Link>
                            </div>
                            <form className="d-flex">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                                <button className="btn btn-red" type="submit">Search</button>
                            </form>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
        <Outlet />
        </>
  )
}


export default Header;
