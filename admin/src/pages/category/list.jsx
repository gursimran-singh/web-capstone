import "../../assets/css/style.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import baseURL from "../../authRequest.js";

export default function ProductList() {
  const [data, setData] = useState();

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
    console.log(id);
    baseURL.put("/category/delete/" + id)
      .then(response => {

        // success message 

      })
      .catch(error => console.log(error.response));

  };

  const columns = [
    {
      field: "Category",
      headerName: "Name",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.name}
          </div>
        );
      },
    },
    {
      field: "Status",
      headerName: "flag",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/categories/" + params.row.id}>
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
    baseURL.get("/category")
      .then(
        (result) => {
          setData(result.data);
          console.log(data);
        },
      ).catch(function (error) {
        if (error.response) {
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

      });
  }, []);

  return (

    <div className="productList">
      <div className="datatableTitle">
        Categories
        <Link to="/categories/newCategory" className="link">
          Add New Category
        </Link>
      </div>
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={10}
      />
    </div>
  );
}
