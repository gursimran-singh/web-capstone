import React, { useState, useEffect, Component } from "react";
import baseURL from "../../authRequest.js";
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
    const [goBack, setGoBack] = useState("");
    const [errorMsg, seterrorMsg] = useState("");
    const [objCategory, setCategory] = useState([]);

    const location = useLocation();
    const prodId = location.pathname.split("/")[2];

    const getProduct = id => {
        baseURL.get('/food/' + id)
            .then(response => {
                getCategories();
                setcurrentProduct(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getProduct(prodId);
    }, [prodId]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setcurrentProduct({ ...currentProduct, [name]: value });
    };

    const updateField = (field, value) => {
        setcurrentProduct({ ...currentProduct, ["image"]: value });
    };

    const clickGoBack = () => {
        setGoBack("goback");
    };


    const updateProduct = () => {
        if (handleValidation()) {
            baseURL.put("/food/" + currentProduct.id, currentProduct)
                .then(response => {
                    console.log(response.data);
                    setMessage("The Product updated successfully!");
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
        if (!fields["category_id"]) {
            formIsValid = false;
            seterrorMsg({ ["category_id"]: "Please select category" });
        }
        if (!fields["image"]) {
            formIsValid = false;
            seterrorMsg({ ["image"]: "Please select image" });
        }
        if (!fields["price"]) {
            formIsValid = false;
            seterrorMsg({ ["price"]: "Cannot be empty" });
        } else {

            if (typeof fields["price"] !== "undefined") {
                let _price = fields["price"].toString();
                if (!_price.match(/^[0-9]+$/)) {
                    formIsValid = false;
                    seterrorMsg({ ["price"]: "Price can be numeric only" });
                }
            }
        }
        if (!fields["description"]) {
            formIsValid = false;
            seterrorMsg({ ["description"]: "Cannot be empty" });
        }
        if (!fields["rating"]) {
            formIsValid = false;
            seterrorMsg({ ["rating"]: "Cannot be empty" });
        }

        return formIsValid;
    };

    const getCategories = () => {
        baseURL.get("/category")
            .then(response => {
                setCategory(response.data);
            })
            .catch(error => console.log(error.response));
    };
    if (goBack == "goback") {
        return <Navigate to="/products" />;
    }
    return (
        <div className="newProduct" >
            <h1 className="addProductTitle">Update Product Information</h1>
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
                    <label>Name</label>
                    <input type="text" placeholder="Name" name="name" onChange={handleInputChange}
                        value={currentProduct.name} />
                    <span style={{ color: "red" }}>{errorMsg.name}</span>

                </div>
                <div className="addProductItem">
                    <label>Category</label>
                    <select name="category_id" onChange={handleInputChange} value={currentProduct.category_id}>
                        {objCategory.map(obj => {
                            return (
                                <option
                                    key={obj.id}
                                    value={obj.id}
                                    onChange={handleInputChange}

                                >
                                    {obj.name}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div className="addProductItem">
                    <label>Price</label>
                    <input type="text" placeholder="price" onChange={handleInputChange}
                        value={currentProduct.price} name="price" />
                    <span style={{ color: "red" }}>{errorMsg.price}</span>
                </div>
                <div className="addProductItem">
                    <label>Rating</label>
                    <input type="text" placeholder="Rating" onChange={handleInputChange}
                        value={currentProduct.rating} name="rating" />
                    <span style={{ color: "red" }}>{errorMsg.rating}</span>
                </div>
                <div className="addProductItem">
                    <label>Description</label>
                    <input type="textarea" row="2" onChange={handleInputChange}
                        value={currentProduct.description} name="description" />
                    <span style={{ color: "red" }}>{errorMsg.description}</span>

                </div>
                <div className="addProductItem">
                    <label>Change Image</label>
                    <UploadImage section="item" updateField={updateField.bind(this)} />
                    <span style={{ color: "red" }}>{errorMsg.image}</span>
                    <img alt="Item pic" src={currentProduct.image} />

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