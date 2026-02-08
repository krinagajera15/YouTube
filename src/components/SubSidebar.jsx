import React from "react";
import {
  MdHome,
  MdHistory,
  MdVideoLibrary,
  MdAddCircleOutline,
} from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions } from "react-icons/md";
import "./SubSidebar.css";
import { NavLink } from "react-router-dom";

const MiniSidebar = () => {
  return (
    <div className="sidebar-mini">
      <div className="sidebar-item-mini-active">
        <MdHome className="s-icon-mini" /> 
        <NavLink to={"/"}>Home</NavLink>
      </div>
      <div className="sidebar-item-mini">
        <SiYoutubeshorts className="s-icon-mini" /> 
        <NavLink to={"/shorts"}>Shorts</NavLink>
      </div>
      <div className="sidebar-item-mini">
        <MdOutlineSubscriptions className="s-icon-mini" /> 
        <NavLink>Subscriptions</NavLink>
      </div>
      <hr />
      <div className="sidebar-item-mini">
        <MdHistory className="s-icon-mini" /> 
        <NavLink>History</NavLink>
      </div>
      <div className="sidebar-item-mini">
        <MdAddCircleOutline className="s-icon-mini" /> 
        <NavLink>Add Video</NavLink>
      </div>
    </div>
  );
};
export default MiniSidebar;
