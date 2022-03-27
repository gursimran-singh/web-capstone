import React, { Component } from 'react';
import "./product.css";
import baseURL from "../../requestMethods.js";

class Form extends Component {

  constructor(props) {
    super(props);

    this.state = {
      fields: {},
      errors: {},
      data:[],
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
      // if()
      // if (!fields["price"].match(/^[0-9]+$/)) {
      //   formIsValid = false;
      //   errors["price"] = "Price can be numeric only.";
      // }
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
console.log(this.state.fields);
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
    console.log(e);
    let fields = this.state.fields;
    if(e.target.name == "rating" || e.target.name == "price")
    {
      fields[field] = parseInt(e.target.value);
      this.setState({ fields });
    }else
    {
      fields[field] = e.target.value;
      this.setState({ fields });
    }
    
  }

  componentDidMount() {
    baseURL.get("/category")
      .then(response => {
        console.log(response.data );
        this.setState({ data: response.data });

        const { schemass } = this.state; 
        console.log(schemass);
      })
      .catch(error => console.log(error.response));
  }

  render() {
    return (
      <div className="newProduct" >
        <h1 className="addProductTitle">New Product</h1>
        <form className="addProductForm" onSubmit={this.contactSubmit.bind(this)}>
          <div className="addProductItem">
            <label>Image</label>
            <input type="text" placeholder="Image" onChange={this.handleChange.bind(this, "image")}
              value={this.state.fields["image"]} />
               <input type="text" placeholder="Rating" onChange={this.handleChange.bind(this, "rating")}
              value={this.state.fields["rating"]} name="rating" />
            {/* <input type="file" id="file" /> */}
          </div>
          <div className="addProductItem">
            <label>Name</label>
            <input type="text" placeholder="Name" onChange={this.handleChange.bind(this, "name")}
              value={this.state.fields["name"]} />
            <span style={{ color: "red" }}>{this.state.errors["name"]}</span>

          </div>
          <div className="addProductItem">
            <label>Category</label>
            <select  onChange={this.handleChange.bind(this, "categoryId")}>
                {this.state.data.map(obj => {
                  return (
                    <option
                      key={obj.id}
                      value={obj.id}
                      onChange={this.handleChange.bind(this, "categoryId")}
                    >
                      {obj.name}
                    </option>
                  );
                })}
              </select>
          </div>
          <div className="addProductItem">
            <label>Price</label>
            <input type="text" placeholder="price" onChange={this.handleChange.bind(this, "price")}
              value={this.state.fields["price"]} name="price" />
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