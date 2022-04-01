import "./category.css";
import React, { Component } from 'react';
import baseURL from "../../requestMethods.js";
import { Navigate } from "react-router-dom";

class CategoryForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fields: {},
      errors: {},
      data: [],
      redirect: null,
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
    this.setState({ errors: errors });
    return formIsValid;
  }

  contactSubmit(e) {
    e.preventDefault();


    if (this.handleValidation()) {
      baseURL.post("/category", this.state.fields)
        .then(res => {
          if (res.status == 200) {
            this.setState({ redirect: "/categories" });
          }
        });
    } else {
      // show validation summary here
    }
  }

  handleChange(field, e) {
    console.log(e);
    let fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState({ fields });
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }
    return (
      <div className="newProduct" >
        <h1 className="addProductTitle">New Category</h1>
        <form className="addProductForm" onSubmit={this.contactSubmit.bind(this)}>
          <div className="addProductItem">
            <label>Image</label>
            <input type="text" placeholder="Image" onChange={this.handleChange.bind(this, "image")}
              value={this.state.fields["image"]} />

            {/* <input type="file" id="file" /> */}
          </div>
          <div className="addProductItem">
            <label>Name</label>
            <input type="text" placeholder="Name" onChange={this.handleChange.bind(this, "name")}
              value={this.state.fields["name"]} />
            <span style={{ color: "red" }}>{this.state.errors["name"]}</span>

          </div>
          <button className="addProductButton" type="submit">Create</button>
        </form>
      </div>


    )
  }
}


export default CategoryForm;