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

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-item active">
        <MdHome className="s-icon" /> <span>Home</span>
      </div>
      <div className="sidebar-item">
        <SiYoutubeshorts className="s-icon" /> <span>Shorts</span>
      </div>
      <div className="sidebar-item">
        <MdOutlineSubscriptions className="s-icon" /> <span>Subscriptions</span>
      </div>
      <hr />
      <div className="sidebar-title">You &gt;</div>
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
