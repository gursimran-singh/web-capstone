import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";

import { Link } from "react-router-dom";
// import "../../assets/css/style.css";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import baseURL from "../../slices/requestMethods.js";

export default function WidgetSm() {
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
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/users"}>
              <button className="widgetSmButton">
                <Visibility className="widgetSmIcon" />
                Display
              </button>
            </Link>
          </>
        );
      },
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
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>

      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={4}
        hideFooterPagination
        hideColumnHeader 
      />
    </div>
  );
}



// return (
//   <div className="widgetSm">
//     <span className="widgetSmTitle">New Join Members</span>
//     <ul className="widgetSmList">
//       <li className="widgetSmListItem">
//         <img
//           src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
//           alt=""
//           className="widgetSmImg"
//         />
//         <div className="widgetSmUser">
//           <span className="widgetSmUsername">Anna Keller</span>
//           <span className="widgetSmUserTitle">Software Engineer</span>
//         </div>
//         <button className="widgetSmButton">
//           <Visibility className="widgetSmIcon" />
//           Display
//         </button>
//       </li>
//       <li className="widgetSmListItem">
//         <img
//           src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
//           alt=""
//           className="widgetSmImg"
//         />
//         <div className="widgetSmUser">
//           <span className="widgetSmUsername">Anna Keller</span>
//           <span className="widgetSmUserTitle">Software Engineer</span>
//         </div>
//         <button className="widgetSmButton">
//           <Visibility className="widgetSmIcon" />
//           Display
//         </button>
//       </li>
//       <li className="widgetSmListItem">
//         <img
//           src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
//           alt=""
//           className="widgetSmImg"
//         />
//         <div className="widgetSmUser">
//           <span className="widgetSmUsername">Anna Keller</span>
//           <span className="widgetSmUserTitle">Software Engineer</span>
//         </div>
//         <button className="widgetSmButton">
//           <Visibility className="widgetSmIcon" />
//           Display
//         </button>
//       </li>
//       <li className="widgetSmListItem">
//         <img
//           src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
//           alt=""
//           className="widgetSmImg"
//         />
//         <div className="widgetSmUser">
//           <span className="widgetSmUsername">Anna Keller</span>
//           <span className="widgetSmUserTitle">Software Engineer</span>
//         </div>
//         <button className="widgetSmButton">
//           <Visibility className="widgetSmIcon" />
//           Display
//         </button>
//       </li>
//       <li className="widgetSmListItem">
//         <img
//           src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
//           alt=""
//           className="widgetSmImg"
//         />
//         <div className="widgetSmUser">
//           <span className="widgetSmUsername">Anna Keller</span>
//           <span className="widgetSmUserTitle">Software Engineer</span>
//         </div>
//         <button className="widgetSmButton">
//           <Visibility className="widgetSmIcon" />
//           Display
//         </button>
//       </li>
//     </ul>
//   </div>
// );
// }
