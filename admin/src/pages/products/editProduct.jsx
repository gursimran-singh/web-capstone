import React, { useState, useEffect, Component } from "react";
import baseURL from "../../requestMethods.js";
import { Link, useLocation } from "react-router-dom";
import "./product.css";

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
        baseURL.get('/food/' + id)
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
            baseURL.put("/food/" + currentProduct.id, currentProduct)
                .then(response => {
                    console.log(response.data);
                    setMessage("The Product was updated successfully!");
                })
                .catch(e => {
                    console.log(e);
                });
        }
    };

    const handleValidation = () => {
        let fields = currentProduct;
        let errors = {};
        let formIsValid = true;

        //Name
        if (!fields["name"]) {
            formIsValid = false;
            seterrorMsg({ ["name"]: "Cannot be empty" });
        }

        if (!fields["price"]) {
            formIsValid = false;
            seterrorMsg({ ["price"]: "Cannot be empty" });
        } else {

            if (typeof fields["price"] !== "undefined") {
                if (!fields["price"].match(/^[0-9]+$/)) {
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

    return (
        <div className="newProduct" >
            <h1 className="addProductTitle">Update Product Information</h1>
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
                <div className="addProductItem">
                    <label>Category</label>
                    {/* <select onChange={handleInputChange}>
                            {this.state.data.map(obj => {
                                return (
                                    <option
                                        key={obj.id}
                                        value={currentProduct.category_id}
                                        onChange={handleInputChange}
                                    >
                                        {obj.name}
                                    </option>
                                );
                            })}
                        </select> */}
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
            </form>



            <button
                type="submit"
                className="addProductButton"
                onClick={updateProduct}
            >
                Update
            </button>
            <p>{message}</p>
        </div>
    );
};

export default Product;