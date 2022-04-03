import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './main.css';
import 'bootstrap/js/dist/tab';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link , Navigate} from 'react-router-dom';
import {useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";


function ProfileData() {
    const [successful,setSuccess] = useState(false);
    const [message,setMessage] = useState(false);
    const [userDetails, setDetails] = useState([]);
    const config = {
        headers: { 'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem("user")).token}`}
    };
  useEffect(() => {
    const fetchData = async() => {
        
      const result = await axios.get(
        'https://6fdhemeqha.execute-api.ca-central-1.amazonaws.com/dev/api/user/profile',
        config
      );
      setDetails(result.data[0])
     };
    fetchData();
  }, []);

  
  const initialValues = {

    name: userDetails != undefined && userDetails.name,
    password: "",
    cfm_password: "",
    address: userDetails != undefined && userDetails.address,
  };

  const handleUpdateUser1 = event => {
    const { name, value } = event.target;
    setDetails({ ...userDetails, [name]: value });
    console.log(initialValues.name);
    //initialValues = userDetails;
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .test(
        "len",
        "Username must be between 5 and 20 characters.",
        (val) =>
          val && val.toString().length >= 5 && val.toString().length <= 20
      )
      .required("Name is required!"),
      password: Yup.string(),
      cfm_password: Yup.string().oneOf([Yup.ref("password")], "Password must match"),
      address: Yup.string().required("Address is required")
  });

  const handleUpdateUser = (submitVal) => {
      console.log(1);
    const config = {
        headers: { 'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem("user")).token}`}
    };

    let bodyData = {};

    if(submitVal.password == "") {
         bodyData = {
            name: submitVal.name,
            address : submitVal.address
        } 
    } else {
         bodyData = {
            name: submitVal.name,
            password : submitVal.password,
            address : submitVal.address
        }
    }
    
    
        const fetchData1 = async() => {
            
          const result1 = await axios.put(
            'https://6fdhemeqha.execute-api.ca-central-1.amazonaws.com/dev/api/user/profile',bodyData,
            config
          );
          if(result1.data.hasOwnProperty("user")){
            setMessage(true);
            setSuccess(true);
            setDetails(result1.data[0])

          }else{
            setMessage(true);
            setSuccess(false);
          }
          
         };

        fetchData1(); 
        
  }

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
                   <div className="row pt-5">
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
                       <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleUpdateUser}
                        >
                       <Form className="row">
                       <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <Field name="name" value={userDetails.name} onChange={handleUpdateUser1}  type="text" className="form-control" />
                                <ErrorMessage
                                    name="name"
                                    component="p"
                                    className="alert alert-danger"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">New Password</label>
                                <Field name="password"  type="password" className="form-control" />
                                <ErrorMessage
                                    name="password"
                                    component="p"
                                    className="alert alert-danger"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="cfm_password" className="form-label">Confirm Password</label>
                                <Field name="cfm_password" type="password" className="form-control" />
                                <ErrorMessage
                                    name="cfm_password"
                                    component="p"
                                    className="alert alert-danger"
                                />
                            </div>
                            
                            </div>
                            <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="address" className="form-label">Address</label>
                                <Field name="address" value={userDetails.address} onChange={handleUpdateUser1} type="textbox" className="form-control" />
                                <ErrorMessage
                                    name="address"
                                    component="p"
                                    className="alert alert-danger"
                                />
                            </div>
                             <button type="submit" className="btn btn-primary">Update</button>
                            </div>
                           
                            </Form>
                            </Formik>
                       
                   </div>
                </div>
                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                <div className="table-responsive">
                <table style={{minHeight : "350px"}} className="table table-hover">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        </tr>
                        <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        </tr>
                        <tr>
                        <th scope="row">3</th>
                        <td colSpan="2">Larry the Bird</td>
                        <td>@twitter</td>
                        </tr>
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
    const loggedIn = useSelector((state)=>state.auth.loggedIn);
    if(!loggedIn) {
        return <Navigate to='/homepage' />;
  } else {
    return(
        <>
        <ProfileData></ProfileData>
        </>
    )
  }
    
}



export default Profile;

