import "../../assets/css/style.css";
import React, { Component } from 'react';
import baseURL from "../../authRequest.js";
import { Navigate } from "react-router-dom";
import logo from  "../../assets/images/default-image.jpg";
import UploadImage from '../../Components/uploadImage/uploadImage';

class CategoryForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fields: {},
      errors: {},
      data: [],
      redirect: null,
    };
// default image
    let fields = this.state.fields;
    fields["image"] = logo;
    this.setState({ fields });
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
    if (!fields["image"]) {
      formIsValid = false;
      errors["image"] = "Please select image";
    }
    this.setState({ errors: errors });
    return formIsValid;
  }

  formSubmit(e) {
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
  updateField(field, value){
    let fields = this.state.fields;
    fields[field] = value;
    this.setState({ fields });
  }

  clickGoBack(e) {
    e.preventDefault();
    this.setState({ redirect: "/categories" });
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }
    return (
      <div className="newProduct" >
        <h1 className="addProductTitle">New Category</h1>
        <form className="addProductForm" onSubmit={this.formSubmit.bind(this)}>
        <div className="addProductItem">
            <label>Image</label>
            <UploadImage section="category" updateField={this.updateField.bind(this)} />
            <span style={{ color: "red" }}>{this.state.errors["image"]}</span>
            <img alt="Item pic" src={this.state.fields['image']} />
          </div>
          <div className="addProductItem">
            <label>Name</label>
            <input type="text" placeholder="Name" onChange={this.handleChange.bind(this, "name")}
              value={this.state.fields["name"]} />
            <span style={{ color: "red" }}>{this.state.errors["name"]}</span>

          </div>
       <button className="btn btnSuccess" type="submit">Create</button>

          <button
            type="button"
            className="btn btnBack"
            onClick={this.clickGoBack.bind(this)}>
            Back
          </button>
        </form>
      </div>


    )
  }
}


export default CategoryForm;