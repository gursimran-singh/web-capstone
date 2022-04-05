import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './main.css';
import 'bootstrap/js/dist/tab';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";

function ProfileData() {
    const initialProdState = {
        id: null,
    };
    const [successful, setSuccess] = useState(false);
    const [message, setMessage] = useState(false);
    const [userDetails, setDetails] = useState(initialProdState);
    const [errors, seterrorMsg] = useState(initialProdState);
    const [isPasswordMod, setisPasswordMod] = useState(false);
    const config = {
        headers: { 'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem("user")).token}` }
    };

    useEffect(() => {
        const fetchData = async () => {

            const result = await axios.get(
                'https://6fdhemeqha.execute-api.ca-central-1.amazonaws.com/dev/api/user/profile',
                config
            );
            setDetails(result.data[0]);

        };
        fetchData();

    }, []);

    const [userOrders, setOrder] = useState([]);
    useEffect(() => {
        const fetchData2 = async () => {

            const result2 = await axios.get(
                'https://6fdhemeqha.execute-api.ca-central-1.amazonaws.com/dev/api/order/user', config
            );
            setOrder(result2.data.Items)
        };
        fetchData2();
    }, []);

    const handleUpdateUser1 = event => {
        const { name, value } = event.target;
        setDetails({ ...userDetails, [name]: value });
        if (name == "password") {
            setisPasswordMod(true);
        }
    }

    const updateProduct = () => {
        if (handleValidation()) {


            let bodyData = {};

            if (userDetails.password == "") {
                bodyData = {
                    name: userDetails.name,
                    address: userDetails.address
                }
            } else {
                bodyData = {
                    name: userDetails.name,
                    password: userDetails.password,
                    address: userDetails.address
                }
            }
            axios.put(
                'https://6fdhemeqha.execute-api.ca-central-1.amazonaws.com/dev/api/user/profile', bodyData,
                config
            )
                .then(response => {
                    setMessage(true);
                    setSuccess(true);
                })
                .catch(e => {
                    console.log(e);
                    setMessage(true);
                    setSuccess(false);
                });
        }
    };


    const handleValidation = () => {

        let fields = userDetails;
        let formIsValid = true;
        let errors = {};

        if (!fields["name"]) {
            formIsValid = false;
            errors["name"] = "Cannot be empty";
        }

        if (isPasswordMod) {
            if (fields["password"].length > 0) {
                if (!fields["cfm_password"]) {
                    formIsValid = false;
                    errors["cfm_password"] = "Cannot be empty";
                } else {

                    if (fields["cfm_password"] !== fields["password"]) {
                        formIsValid = false;
                        errors["cfm_password"] = "Confirm password and password should be same.";
                    }
                }
            }
        }
        if (!fields["address"]) {
            formIsValid = false;
            errors["address"] = "Cannot be empty";
        }
        seterrorMsg(errors);
        return formIsValid;
    };

    return (
        <>
            <div className="container pb-5 pt-5">

                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Profile</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Orders</button>
                    </li>

                </ul>
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <div className="row pt-5" style={{minHeight: "350px"}}>
                            {

                                message && (
                                    <div className="form-group">
                                        <div
                                            className={
                                                successful ? "alert alert-success" : "alert alert-danger"
                                            }
                                            role="alert">
                                            {successful ? "Updated Successfully" : "Error. Try Again"}

                                        </div>
                                    </div>
                                )}
                            <form className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input name="name" value={userDetails.name} onChange={handleUpdateUser1} type="text" className="form-control" />
                                        <span
                                            style={{ color: "red" }}
                                        >{errors["name"]}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">New Password</label>
                                        <input name="password" type="password" className="form-control" onChange={handleUpdateUser1} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="cfm_password" className="form-label">Confirm Password</label>
                                        <input name="cfm_password" type="password" className="form-control" onChange={handleUpdateUser1} />
                                        <span
                                            style={{ color: "red" }}
                                        >{errors["cfm_password"]}</span>
                                    </div>

                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="address" className="form-label">Address</label>
                                        <input name="address" value={userDetails.address} onChange={handleUpdateUser1} type="textbox" className="form-control" />
                                        <span
                                            style={{ color: "red" }}
                                        >{errors["address"]}</span>
                                    </div>
                                    <button type="button" className="btn btn-primary" onClick={updateProduct}>Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                        <div className="table-responsive">
                            <table style={{ minHeight: "350px" }} className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Order No</th>
                                        <th scope="col">Dishes</th>
                                        <th scope="col">Total Amount</th>
                                        <th scope="col">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        userOrders.map((orderItems) => {
                                            let dish_name = JSON.parse(orderItems.dish_list);
                                            return (
                                                <tr key={orderItems.id}>
                                                    <th scope="row">{orderItems.id}</th>
                                                    <td>{dish_name.map((dish, i) => {
                                                        return (
                                                            <li key={i++}>{dish.item_name} - {dish.quantity}</li>
                                                        )
                                                    })}</td>
                                                    <td>$ {orderItems.total_price}</td>
                                                    <td>{orderItems.order_date}</td>
                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>
                            </table>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

function Profile() {
    const loggedIn = useSelector((state) => state.auth.loggedIn);
    if (!loggedIn) {
        return <Navigate to='/homepage' />;
    } else {
        return (
            <>
                <ProfileData></ProfileData>
            </>
        )
    }

}



export default Profile;

