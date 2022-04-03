import "../../assets/css/style.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import baseURL from "../../requestMethods.js";

export default function ProductList() {
  const [data, setData] = useState();

 

  const columns = [
    {
      field: "Name",
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
    
  ];

  useEffect(() => {
    baseURL.get("/user")
      .then(
        (result) => {
          console.log(data);
          setData(result.data);
          
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
        Users
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
