import "./product.css";
import { DataGrid } from "@mui/x-data-grid";
// import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import React from 'react';
import axios from 'axios';

const [data, setData] = useState(productRows);
const handleDelete = (id) => {
  setData(data.filter((item) => item.id !== id));
};

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "product",
    headerName: "Product",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="productListItem">
          <img className="productListImg" src={params.row.img} alt="" />
          {params.row.name}
        </div>
      );
    },
  },
  { field: "stock", headerName: "Stock", width: 200 },
  {
    field: "status",
    headerName: "Status",
    width: 120,
  },
  {
    field: "price",
    headerName: "Price",
    width: 160,
  },
  {
    field: "action",
    headerName: "Action",
    width: 150,
    renderCell: (params) => {
      return (
        <>
          <Link to={"/product/" + params.row.id}>
            <button className="productListEdit">Edit</button>
          </Link>
          <DeleteOutline
            className="productListDelete"
            onClick={() => handleDelete(params.row.id)}
          />
        </>
      );
    },
  },
];

export default class ProductList extends React.Component {

  
  state = {
    items: []
  }

  componentDidMount() {
    axios.get(`https://6fdhemeqha.execute-api.ca-central-1.amazonaws.com/dev/api/food`)
      .then(res => {
        const items = res.data;
        this.setState({ items });
      });
  }

  


  

  render() {
    return (

      <DataGrid
               rows={this.state}
               disableSelectionOnClick
               columns={columns}
               pageSize={8}
               checkboxSelection
             />

      // <ul>
      //   {
      //     this.state.items
      //       .map(item =>
      //         <div className="productList">
      //         <div className="datatableTitle">
      //           Products
      //          <Link to="/products/newProduct" className="link">
      //          Add New Product
      //          </Link>
      //        </div>
      //        <p>{item.name}</p>
      //        {/* <DataGrid
      //          rows={data}
      //          disableSelectionOnClick
      //          columns={columns}
      //          pageSize={8}
      //          checkboxSelection
      //        /> */}
      //      </div>
      //       )
      //   }
      // </ul>
    )
  }
}