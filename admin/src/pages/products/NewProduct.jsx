import React, { Component } from 'react';
import "./product.css";
import baseURL from "../../requestMethods.js";

class Form extends Component {

  constructor(props) {
    super(props);

    this.state = {
      fields: {},
      errors: {},
    };
  }

  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //Name
    if (!fields["name"]) {
      formIsValid = false;
      errors["name"] = "Cannot be empty";
    }


   
    if (!fields["price"]) {
      formIsValid = false;
      errors["price"] = "Cannot be empty";
    }


   
    if (typeof fields["price"] !== "undefined") {
      if (!fields["price"].match(/^[0-9]+$/)) {
        formIsValid = false;
        errors["price"] = "Price can be numeric only.";
      }
    }


    if (!fields["description"]) {
      formIsValid = false;
      errors["description"] = "Cannot be empty";
    }


    this.setState({ errors: errors });
    return formIsValid;
  }

  contactSubmit(e) {
    e.preventDefault();

    if (this.handleValidation()) {
      baseURL.post("/food", this.state.fields)
        .then(res => {
          console.log(res);
          console.log(res.data);
        });
    } else {
      // show validation summary here
    }
  }

  handleChange(field, e) {
    let fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState({ fields });
  }


  render() {
    return (


      <div className="newProduct" >
        <h1 className="addProductTitle">New Product</h1>
        <form className="addProductForm" onSubmit={this.contactSubmit.bind(this)}>
          <div className="addProductItem">
            <label>Image</label>
            <input type="file" id="file" />
          </div>
          <div className="addProductItem">
            <label>Name</label>
            <input type="text" placeholder="Name" onChange={this.handleChange.bind(this, "name")}
              value={this.state.fields["name"]} />
            <span style={{ color: "red" }}>{this.state.errors["name"]}</span>

          </div>
          <div className="addProductItem">
            <label>Category</label>
            <select name="active" id="active">
              <option value="yes">cate1</option>
              <option value="no">cate2</option>
            </select>
          </div>
          <div className="addProductItem">
            <label>Price</label>
            <input type="text" placeholder="price" onChange={this.handleChange.bind(this, "price")}
              value={this.state.fields["price"]} />
                 <span style={{ color: "red" }}>{this.state.errors["price"]}</span>
          </div>
          <div className="addProductItem">
            <label>Description</label>
            <input type="textarea" row="2" onChange={this.handleChange.bind(this, "description")}
              value={this.state.fields["description"]} />
            <span style={{ color: "red" }}>{this.state.errors["description"]}</span>

          </div>
          <button className="addProductButton" type="submit">Create</button>
        </form>
      </div>
    )
  }
}


export default Form;