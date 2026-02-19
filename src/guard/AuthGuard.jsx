import React, { useState, useContext } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import MiniSidebar from "../components/SubSidebar";
import { Outlet } from "react-router-dom";
import Modecontext from "../Context/ModeContext";

export const AuthGuard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const ctx = useContext(Modecontext);
  const theme = ctx?.mode || 'light';

  const bgColor = theme === "dark" ? "#0f0f0f" : "#ffffff";
  const textColor = theme === "dark" ? "white" : "black";

  return (
    <>
      <div style={{ backgroundColor: bgColor, minHeight: "100vh", color: textColor }}>
        
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <div style={{ display: "flex" }}>
          {isSidebarOpen ? <Sidebar /> : <MiniSidebar />}
          <div style={{ flex: 1, padding: "20px" }}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};