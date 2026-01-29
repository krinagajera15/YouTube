import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { MdMenu,MdMic, MdNotifications } from "react-icons/md";
import "./Navbar.css";
import img from '../assets/image/youtube.png'
import { AiOutlinePlus } from "react-icons/ai";

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <MdMenu className="nav-icon" />
        {/* Logo ni size fixed karvi jaruri chhe */}
        <img 
          src={img} 
          alt="YouTube Logo" 
          className="yt-logo" 
        />
        <h1 className="yt-logo">YouTube</h1>
        <span className="country-code">IN</span>
      </div>
      
      <div className="nav-center">
        <div className="search-box">
          <input type="text" placeholder="Search" />
          <button className="search-btn"><AiOutlineSearch /></button>
        </div>
        <div className="mic-icon"><MdMic /></div>
      </div>

      <div className="nav-right">
      <AiOutlinePlus />
      <span>Create</span>
        <MdNotifications className="nav-icon" />
        <div className="user-profile">RP</div>
      </div>
    </nav>
  );
};