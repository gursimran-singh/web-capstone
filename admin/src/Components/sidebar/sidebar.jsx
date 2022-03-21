import "./sidebar.css";
import {
  LineStyle,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
} from "@material-ui/icons";
 import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
            <li className="sidebarListItem active">
              <LineStyle className="sidebarIcon" />
              Home
            </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/categories" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Categories
              </li>
            </Link>
            <Link to="/products" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Products
              </li>
            </Link>
            <li className="sidebarListItem">
              <AttachMoney className="sidebarIcon" />
              Orders
            </li>
            
            {/* <li className="sidebarListItem">
              <BarChart className="sidebarIcon" />
              Reports
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
}