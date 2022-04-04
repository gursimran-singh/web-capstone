import "../../assets/css/style.css";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import baseURL from "../../slices/requestMethods.js";

export default function ProductList() {
  const [data, setData] = useState();


  const columns = [
    {
      field: "id", headerName: "Order Id", width: 290,
      renderCell: (params) => {
        return (

          <div className="productListItem">  {params.row.id}</div>

        );
      },
    },
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
      field: "price", headerName: "Quantity", width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            ${params.row.total_price}
          </div>
        );
      },
    },
    {
      field: "order_date",
      headerName: "Order Date",
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
    const fetchData = async () => {

      const result = baseURL.get("/order")
        .then(response => {
          setData(response.data.Items);
          console.log(response);
        });
    };
    fetchData();
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
