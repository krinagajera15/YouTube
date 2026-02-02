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

const MiniSidebar = () => {
  return (
    <div className="sidebar-mini">
      <div className="sidebar-item-mini-active">
        <MdHome className="s-icon-mini" /> 
        <span>Home</span>
      </div>
      <div className="sidebar-item-mini">
        <SiYoutubeshorts className="s-icon-mini" /> 
        <span>Shorts</span>
      </div>
      <div className="sidebar-item-mini">
        <MdOutlineSubscriptions className="s-icon-mini" /> 
        <span>Subscriptions</span>
      </div>
      <hr />
      <div className="sidebar-item-mini">
        <MdHistory className="s-icon-mini" /> 
        <span>History</span>
      </div>
      <div className="sidebar-item-mini">
        <MdAddCircleOutline className="s-icon-mini" /> 
        <span>Add Video</span>
      </div>
    </div>
  );
};
export default MiniSidebar;
