import React from "react";
import {
  MdHome,
  MdHistory,
  MdVideoLibrary,
  MdAddCircleOutline,
} from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions } from "react-icons/md";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import { MdAccountCircle, MdChevronRight } from "react-icons/md";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-iteme">
        <NavLink to={"/"}  className={({ isActive }) =>isActive ? "sidebar-item active" : "sidebar-item"}><MdHome className="s-icon" /> <span>Home</span></NavLink>
      </div>
      <div className="sidebar-item">
        <NavLink to={"/shorts"} ><SiYoutubeshorts className="s-icon" /> <span>Shorts</span></NavLink>
        {/* <NavLink to={"/shorts"} className={({ isActive }) =>isActive ? "sidebar-item active" : "sidebar-item"}><SiYoutubeshorts className="s-icon" /> <span>Shorts</span></NavLink> */}
      </div>
      <div className="sidebar-item">
      {/* <MdOutlineSubscriptions className="s-icon" /> <span>Subscriptions</span> */}
        <NavLink to={"/subscribe"}><MdOutlineSubscriptions className="s-icon" /> <span>Subscriptions</span></NavLink>
      </div>
      <hr />
      <div className="sidebar-item sidebar-profile">
        <MdAccountCircle className="s-icon" /> 
        <span style={{ fontWeight: "bold" }}>You</span>
        <MdChevronRight style={{ marginLeft: "5px" }} />
      </div>
      <div className="sidebar-item">
        <MdHistory className="s-icon" /> <span>History</span>
      </div>
      <div className="sidebar-item">
        <MdAddCircleOutline className="s-icon" /> <span>Add Video</span>
      </div>
    </div>
  );
};
export default Sidebar;
