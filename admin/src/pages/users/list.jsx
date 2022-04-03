import "../../assets/css/style.css";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import baseURL from "../../slices/requestMethods.js";

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
      field: "email",
      headerName: "Email",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.email}
          </div>
        );
      },
    },
    {
      field: "type",
      headerName: "Type",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.type}
          </div>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 160,
    },

  ];


  useEffect(() => {
    const fetchData = async () => {

      const result = baseURL.get("/user")
      .then(response => {
        setData(response.data.users);
        console.log(data);
    });
    };
    fetchData();
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
