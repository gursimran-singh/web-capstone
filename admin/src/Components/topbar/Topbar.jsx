import React from "react";
import "./topbar.css";
import { ArrowForward } from "@material-ui/icons";


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
            <ArrowForward onClick={logout} title="Logout"/>
          </div>
        </div>
      </div>
    </div>
  );
}