import "./product.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import baseURL from "../../requestMethods.js";

export default function ProductList() {
  const [data, setData] = useState();

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));

    baseURL.delete("/food/delete",id)
    .then(response => {

      // success message 
      
    })
    .catch(error => console.log(error.response));
          
  };

  const columns = [
    // { field: "id", headerName: "ID", width: 90,
    // renderCell: (params) => {
    //   return (
        
    //     <div className="productListItem"> {console.log(params.row)}</div>
         
    //   ); }, },
    {
      field: "product",
      headerName: "Name",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {/* <img className="productListImg" src={} alt="" /> */}
            {params.row.name}
          </div>
        );
      },
    },
    { field: "Category", headerName: "Category", width: 200,
    renderCell: (params) => {
      return (
        <div className="productListItem"> {params.row.category.name}</div>
         
      ); },
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
            <Link to={"/products/" + params.row.id}>
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

  useEffect(() => {
    baseURL.get("/food")
        .then(
          (result) => {
           setData(result.data);
           console.log(data);
          },
        ).catch(function (error) {
          if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
      
        });}, []);

  return (
   
    <div className="productList">
       <div className="datatableTitle">
         Products
        <Link to="/products/newProduct" className="link">
        Add New Product
        </Link>
      </div>
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
