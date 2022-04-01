import React, { useState, useEffect, Component } from "react";
import baseURL from "../../requestMethods.js";
import { Link, useLocation } from "react-router-dom";
import "./category.css";

const Product = props => {
    const initialProdState = {
        id: null,
    };

    const [currentProduct, setcurrentProduct] = useState(initialProdState);
    const [message, setMessage] = useState("");
    const [errorMsg, seterrorMsg] = useState("");

    const location = useLocation();
    const prodId = location.pathname.split("/")[2];

    const getTutorial = id => {
        baseURL.get('/category/' + id)
            .then(response => {
                setcurrentProduct(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getTutorial(prodId);
    }, [prodId]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setcurrentProduct({ ...currentProduct, [name]: value });
    };


    const updateProduct = () => {
        if (handleValidation()) {
            baseURL.put("/category/" + currentProduct.id, currentProduct)
                .then(response => {
                    console.log(response.data);
                    setMessage("The Category was updated successfully!");
                })
                .catch(e => {
                    console.log(e);
                });
        }
    };

    const handleValidation = () => {
        let fields = currentProduct;
        let formIsValid = true;

        //Name
        if (!fields["name"]) {
            formIsValid = false;
            seterrorMsg({ ["name"]: "Cannot be empty" });
        }

        return formIsValid;
    };

    return (
        <div className="newProduct" >
            <h1 className="addProductTitle">Update Category Information</h1>
            <form className="addProductForm">
                <div className="addProductItem">
                    <label>Image</label>
                    <input type="text" name="image" placeholder="Image" onChange={handleInputChange}
                        value={currentProduct.image} />
                </div>
                <div className="addProductItem">
                    <label>Name</label>
                    <input type="text" placeholder="Name" name="name" onChange={handleInputChange}
                        value={currentProduct.name} />
                    <span style={{ color: "red" }}>{errorMsg.name}</span>

                </div>
            </form>
            <button
                type="submit"
                className="addProductButton"
                onClick={updateProduct}
            >
                Update
            </button>
            {
                message && (
                    <div className="form-group">
                        <div className="alert alert-danger">
                            {message}
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default Product;