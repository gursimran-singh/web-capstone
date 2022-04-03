import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/js/dist/carousel';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/src/dropdown';
import './main.css';
import { useSelector, useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import { logout } from './slices/authSlice';

import { Link, Outlet } from 'react-router-dom'


const dialogStyle = {
    content: {
        top: '20%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
    h2:{
        color: "#0096c7",
    }
};
Modal.setAppElement('#root');

function Header() {
    const loggedIn = useSelector((state) => state.auth.loggedIn);
    const [cfmLogout, setCfmLogout] = useState(false);
    const dispatch = useDispatch();
    let subTitle;
    function logoutDialog() {
        setCfmLogout(true);
    }
    function afterLogoutDialog() {
        subTitle.style.color = "#f00"
    }
    function cancelLogout() {
        setCfmLogout(false);
    }
    function confirmLogout() {
        dispatch(logout()).then(()=>{
            setCfmLogout(false);
        }).catch(()=>{
            setCfmLogout(false);
        }
        );
        
    }
    return (
        <>
            <header>
                <div>
                    <nav className="navbar navbar-expand-lg navbar-light">
                        <div className="container-fluid">
                            <Link to="/homepage" className="nav-item nav-link"><img src="images/logo.png" /></Link>
                            <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarCollapse">
                                <div className="navbar-nav ms-auto">

                                    <Link to="/homepage" className="nav-item nav-link">Home</Link>
                                    <Link to="/menu" className="nav-item nav-link">Menu</Link>
                                    <Link to="/contactus" className="nav-item nav-link">Contact</Link>
                                    
                                    {loggedIn ? (
                                    <div>
                                        <li className="nav-item dropdown ">
                                        <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Profile</a>
                                        <ul className="dropdown-menu">
                                        <li><Link className="dropdown-item" to='/profile'>{JSON.parse(sessionStorage.getItem("user")).user.name}</Link></li>
                                        <li><button onClick={logoutDialog} className="dropdown-item " style={{ border: "none", backgroundColor: "transparent" }}>Logout</button>
                                        <Modal
                                            isOpen={cfmLogout}
                                            onAfterOpen={afterLogoutDialog}
                                            onRequestClose={cancelLogout}
                                            style={dialogStyle}
                                            contentLabel="Confirm logout"
                                        >
                                            <h4 ref={(_subTitle) => (subTitle = _subTitle)} >Are you sure you want to logout?</h4>
                                            <button onClick={cancelLogout}>Cancel</button>
                                            <button onClick={confirmLogout} style={{marginLeft:"1rem"}}> Logout</button>

                                        </Modal></li>
                                      
                                        </ul>
                                    </li>
                                        
                                    </div>) : <Link to="/login" className="nav-item nav-link login">Login</Link>}
                                </div>
                               
                                {/* add link to shopping cart */}
                                <div className="to-cart" style={{ marginLeft: "0.625rem" }}>
                                    <Link to="./cart"><FontAwesomeIcon icon={faShoppingCart} style={{ color: "#913838", fontSize: "1.25rem", }} /></Link>
                                </div>
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
