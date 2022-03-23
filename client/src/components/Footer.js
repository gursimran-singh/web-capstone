import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './main.css';

function Footer(){
    return(
        <footer className="footer-06">
            
            <div className="container pt-4">    
                <div className="row pt-4">
                    <div className="col-md-4 col-lg-6 order-md-last">
                        <div className="row justify-content-end">
                            <div className="col-md-12 col-lg-9 text-md-right mb-md-0 mb-4">
                                <a href="#" className="logo"><img src="images/logo-ver3.png" className="logo" alt="logo"/></a>
                                <p className="copyright">
                              Copyright ©2022 All rights reserved | <i className="ion-ios-heart" aria-hidden="true"></i> by <a href="#" target="_blank">Cuisine De Palace</a>
                             </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8 col-lg-6">
                        <div className="row">
                            <div className="col-md-6 mb-md-0 mb-6">
                                <h2 className="footer-heading">More Links</h2>
                                <ul className="list-unstyled">
                                <li><a href="#" className="py-1 d-block"><span className="ion-ios-checkmark-circle-outline mr-2"></span>Home</a></li>
                                <li><a href="#" className="py-1 d-block"><span className="ion-ios-checkmark-circle-outline mr-2"></span>Menu</a></li>
                                <li><a href="#" className="py-1 d-block"><span className="ion-ios-checkmark-circle-outline mr-2"></span>About</a></li>
                                <li><a href="#" className="py-1 d-block"><span className="ion-ios-checkmark-circle-outline mr-2"></span>Contact Us</a></li>
                                </ul>
                            </div>
                            <div className="col-md-6 mb-md-0 mb-6">
                                <h2 className="footer-heading">Top Categories</h2>
                                <ul className="list-unstyled">
                                <li><a href="#" className="py-1 d-block"><span className="ion-ios-checkmark-circle-outline mr-2"></span>Chinese</a></li>
                                <li><a href="#" className="py-1 d-block"><span className="ion-ios-checkmark-circle-outline mr-2"></span>Italian</a></li>
                                <li><a href="#" className="py-1 d-block"><span className="ion-ios-checkmark-circle-outline mr-2"></span>Indian</a></li>
                                <li><a href="#" className="py-1 d-block"><span className="ion-ios-checkmark-circle-outline mr-2"></span>Mexican</a></li>
                                </ul>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}


export default Footer;