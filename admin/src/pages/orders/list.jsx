import "../../assets/css/style.css";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import baseURL from "../../authRequest.js";

export default function ProductList() {
  const [data, setData] = useState();


  const columns = [
    { field: "id", headerName: "Order Id", width: 90,
    renderCell: (params) => {
      return (

        <div className="productListItem">  {params.row.id}</div>

      ); }, },
    {
      field: "customer_name",
      headerName: "Customer",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.customer_name}
          </div>
        );
      },
    },
    {
      field: "phone",
      headerName: "Customer Contact",
      width: 160,
    },
    {
      field: "items", headerName: "Quantity", width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem"> {params.row.dish_list.length}</div>

        );
      },
    },
    {
      field: "delivery_date",
      headerName: "Delivery Date",
      width: 160,
    },
    // {
    //   field: "action",
    //   headerName: "Action",
    //   width: 150,
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         <Link to={"/products/" + params.row.id}>
    //           <button className="productListEdit">Edit</button>
    //         </Link>
    //         <DeleteOutline
    //           className="productListDelete"
    //           onClick={() => handleDelete(params.row.id)}
    //         />
    //       </>
    //     );
    //   },
    // },
  ];

  useEffect(() => {
    baseURL.get("/order")
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
        Customer Order
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
