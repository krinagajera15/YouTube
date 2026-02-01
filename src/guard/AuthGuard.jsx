import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const AuthGuard = () => {
  return (
    <div style={{ backgroundColor: "#0f0f0f", minHeight: "100vh", color: "white" }}>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        {/* Main Content Area */}
        <div style={{ flex: 1, padding: "20px", backgroundColor: "#0f0f0f" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default AuthGuard;