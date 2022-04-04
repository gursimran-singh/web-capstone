import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useState, useEffect } from "react";
import baseURL from "../../slices/requestMethods.js";
import { Link } from "react-router-dom";

export default function WidgetSm() {

  const initialProdState = {
    id: null,
  };

  const [objData, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {

      const result = baseURL.get("/user")
        .then(response => {
          setData(response.data.users);
        //  console.log(objData);
        });
    };
    fetchData();

  }, []);
  
  if (objData.length > 7) {
    setData(objData.slice(0,7));
  }

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {objData.map(obj => {
          return (
            <li className="widgetSmListItem">
              {/* <img
                src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
                className="widgetSmImg"
              /> */}
              <div className="widgetSmUser">
                <span className="widgetSmUsername">{obj.name}</span>
                <span className="widgetSmUserTitle">{obj.type}</span>
              </div>
              <Link to={"/users"}>
                <button className="widgetSmButton">
                  <Visibility className="widgetSmIcon" />
                  Display
                </button>
              </Link>
            </li>
          );
        })}

      </ul>
    </div>
  );
}
