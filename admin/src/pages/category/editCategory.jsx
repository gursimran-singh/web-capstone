import React, { useState, useEffect, Component } from "react";
import baseURL from "../../slices/authRequest.js";
import { Link, useLocation } from "react-router-dom";
import "../../assets/css/style.css";
import UploadImage from '../../Components/uploadImage/uploadImage';
import { Navigate } from "react-router-dom";

const Product = props => {
    const initialProdState = {
        id: null,
    };

    const [currentProduct, setcurrentProduct] = useState(initialProdState);
    const [message, setMessage] = useState("");
    const [errors, seterrorMsg] = useState(initialProdState);
    const [goBack, setGoBack] = useState("");
    const location = useLocation();
    const catId = location.pathname.split("/")[2];

    const getCategory = id => {
        baseURL.get('/category/' + id)
            .then(response => {
                setcurrentProduct(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getCategory(catId);
    }, [catId]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setcurrentProduct({ ...currentProduct, [name]: value });
    };

    const updateField = (field, value) => {
        setcurrentProduct({ ...currentProduct, ["image"]: value });
    };

    const updateProduct = () => {
        if (handleValidation()) {
            baseURL.put("/category/" + currentProduct.id, currentProduct)
                .then(response => {
                    console.log(response.data);
                    setMessage("The Category was updated successfully!");
                    const interval = setInterval(() => {
                        setGoBack("goback");
                    }, 1000);
                    return () => clearInterval(interval);
                })
                .catch(e => {
                    console.log(e);
                });
        }
    };
    const clickGoBack = () => {
        setGoBack("goback");
    };
    const handleValidation = () => {
        let fields = currentProduct;
        let formIsValid = true;
        let errors = {};
        //Name
        if (!fields["name"]) {
            formIsValid = false;
            errors["name"] = "Cannot be empty";
        }
        if (!fields["image"]) {
            formIsValid = false;
            errors["image"] = "Cannot be empty";
        }

        seterrorMsg(errors);
        return formIsValid;
    };
    if (goBack == "goback") {
        return <Navigate to="/categories" />;
    }
    return (
        <div className="newProduct" >
            <h1 className="addProductTitle">Update Category Information</h1>
            {
                message && (
                    <div className="form-group">
                        <div className="alert alert-danger">
                            {message}
                        </div>
                    </div>
                )
            }
            <form className="addProductForm">
                <div className="addProductItem">
                    <label>Change Image</label>
                    <UploadImage section="item" updateField={updateField.bind(this)} />
                    <span style={{ color: "red" }}>{errors["image"]}</span>
                    <img alt="Item pic" src={currentProduct.image} />

                </div>
                <div className="addProductItem">
                    <label>Name</label>
                    <input type="text" placeholder="Name" name="name" onChange={handleInputChange}
                        value={currentProduct.name} />
                    <span style={{ color: "red" }}>{errors["name"]}</span>
                </div>
            </form>
            <button
                type="submit"
                className=" btn btnSuccess"
                onClick={updateProduct}>
                Update
            </button>

            <button
                type="button"
                className="btn btnBack"
                onClick={clickGoBack}>
                Back
            </button>

        </div>
    );
};

export default Product;