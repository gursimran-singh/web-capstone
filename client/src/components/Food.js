import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './main.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Navigate, Outlet, useParams } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {  useDispatch } from 'react-redux';
import { addDishToCart } from "./slices/cartSlice";

function FoodItem() {
    const [item, setItem] = useState({});
    const [addedToCart, setAddedToCart] = useState(false);
    const dispatch = useDispatch();

    const { id } = useParams();
    useEffect(() => {
        const fetchData = async () => {

            const result = await axios(
                'https://6fdhemeqha.execute-api.ca-central-1.amazonaws.com/dev/api/food/' + id,
            );

            setItem(result.data);
        };
        fetchData();
    }, []);
    // console.log(item);

    const validationSchema = Yup.object().shape({
        quantity: Yup.string()
            .required("Quantity is required!")
            .matches(/^([1-9]|[1-9][0-9]|[1-9][0-9][0-9])$/gm, "The quantity should be in range from 1 to 999"),
    });

    const addToCart = (submitVal) => {
        const {quantity} = submitVal;
        let dish={};
        dish.item_id=item.id;
        dish.item_name=item.name;
        dish.item_price=Number(item.price);
        dish.quantity=parseInt(quantity);
        dish.item_image = item.image;
        if(dispatch(addDishToCart(dish)).payload.item_id){
            alert(`You have added ${quantity} courses of ${item.name}`);
            setAddedToCart(true);
           
        }
        
     };

     if(addedToCart){
       return   <Navigate to='/menu' />;
     }

    return (
        <>
            <div id="menu-banner">
                <div className="banner-text">
                    <h1>{item.name}</h1>
                    <p>Food.Fun.Variety</p>
                    <p className="mb-5">Life's too short for boring food</p>
                </div>
            </div>
            <div className="container pt-5 pb-5">
                <div className="row">
                    <div className="col-md-6">
                        <img src={item.image} alt={item.image} />
                    </div>
                    <div className="col-md-6">
                        <h2>{item.name}</h2>
                        <hr></hr>
                        <p style={{ fontSize: "1.5rem" }}> ${item.price}</p>
                        <p className="lead">
                            {item.description}
                        </p>
                        <div>
                            <Formik
                                initialValues={{ quantity: 1 }}
                                validationSchema={validationSchema}
                                onSubmit={addToCart}
                            >
                                <Form className="to-cart-form">
                                    <div style={{display: "flex", justifyContent: "flex-start", alignItems:"center"}}>
                                    <label htmlFor="quantity">Quantity:</label>
                                    <Field name="quantity" type="number" size="5" maxLength={5} style={{width:"auto", margin: "0 1rem"}}/>
                                    <button type="submit" className="btn btn-red" id="submit-btn">
                                       Add to Cart
                                    </button>
                                    </div>
                                    <ErrorMessage
                                        name="quantity"
                                        component="p"
                                        className="alert alert-danger"
                                    />
                                </Form>
                            </Formik>
                        </div>
                        {/* <button className="btn btn-red">Add to Cart</button> */}
                        <hr />
                        <p className="lead">Category : {item.category != undefined && item.category.name}</p>
                        <p className="lead">Rating : {item.rating} </p>
                    </div>

                </div>
            </div>
        </>

    )


}


function Food() {
    return (
        <>
            <FoodItem></FoodItem>
        </>
    )
}

export default Food;