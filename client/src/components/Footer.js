import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './main.css';
import {Link} from "react-router-dom"

function Footer(){
    return(
        <footer className="footer-06">
            
            <div className="container pt-4">    
                <div className="row pt-4">
                    <div className="col-md-12 text-center">
                        
                                <Link to="/homepage" className="logo"><img src="../images/logo-ver3.png" style={{width:"auto"}} className="logo" alt="logo"/></Link>
                                <p className="copyright">
                              Copyright ©2022 All rights reserved | <i className="ion-ios-heart" aria-hidden="true"></i> by <a href="#" target="_blank">Cuisine De Palace</a>
                             </p>
                           
                    </div>
                </div>
            </div>
        </footer>
    )
}


export default Footer;