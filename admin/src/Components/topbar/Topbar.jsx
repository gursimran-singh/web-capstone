import React from "react";
import "./topbar.css";
import { Settings } from "@material-ui/icons";


export default function Topbar() {

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  }
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Food Service - Admin</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <Settings onClick={logout} title="Logout"/>
          </div>
        </div>
      </div>
    </div>
  );
}