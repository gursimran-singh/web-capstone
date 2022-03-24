import React, { Component } from 'react';
import "./product.css";
import baseURL from "../../requestMethods.js";

//export default function NewProduct() {
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

    if (typeof fields["name"] !== "undefined") {
      if (!fields["name"].match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        errors["name"] = "Only letters";
      }
    }

    //Email
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
      baseURL.post("/food",  this.state.fields )
        .then(res => {
          console.log(res);
          console.log(res.data);
        });
    } else {
      // alert("Form has errors.");
    }
  }

  handleChange(field, e) {
    let fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState({ fields });
  }


  // state = {
  //   name: '',
  //   description: '',
  //   category_id: '',
  //   price: '',
  //   image: '',
  //   rating: ''
  // }

  // handleChange = (e) => {
  //   const name = e.target.name;
  //   const value = e.target.value;
  //   this.setState({ [name]: value },
  //     () => { this.validateField(name, value) });
  // }

  // validateField(fieldName, value) {
  //   let fieldValidationErrors = this.state.formErrors;

  //   this.setState({
  //     formErrors: fieldValidationErrors,
  //     emailValid: emailValid,
  //     passwordValid: passwordValid
  //   }, this.validateForm);
  // }


  // validateForm() {
  //   this.setState({ formValid: this.state.emailValid && this.state.passwordValid });
  // }




  // handleSubmit = event => {
  //   event.preventDefault();

  //   const user = {
  //     name: this.state.name,
  //     category_id:this.state.category_id,
  //     description:this.state.description,
  //     price:this.state.price,
  //     rating:this.state.rating,
  //     image:this.state.image
  //   };

  //   baseURL.post("/food", { user })
  //     .then(res => {
  //       console.log(res);
  //       console.log(res.data);
  //     })
  // }

  // errorClass(error) {
  //   return (error.length === 0 ? '' : 'has-error');
  // }


   render() {
  return(


      <div className = "newProduct" >
        <h1 className="addProductTitle">New Product</h1>
        <form className="addProductForm"  onSubmit={this.contactSubmit.bind(this)}>
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
            <input type="text" placeholder="price" />
          </div>
          <div className="addProductItem">
            <label>Description</label>
            <input type="textarea" row="2"  onChange={this.handleChange.bind(this, "description")}
                value={this.state.fields["description"]}/>
                              <span style={{ color: "red" }}>{this.state.errors["description"]}</span>

          </div>
          <button className="addProductButton" type="submit">Create</button>
        </form>
      </div>
    )
  }
}


export default Form;