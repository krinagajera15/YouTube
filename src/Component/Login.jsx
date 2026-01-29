import React, { useState } from "react";
import "./Login.css";
import loginYt from "../assets/image/yt.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    setError("");

    // ✅ Hardcoded Admin Credentials
    const adminUsername = "ytadmin";
    const adminPassword = "yt@123";

    if (!username || !password) {
      setError("Please enter username and password");
      return;
    }

    if (username === adminUsername && password === adminPassword) {
      // ✅ Save login info (optional)
      localStorage.setItem(
        "LoginData",
        JSON.stringify({ role: "admin", username })
      );

      // ✅ Redirect to Admin Dashboard
      navigate("/admindash");
    } else {
      
      localStorage.setItem(
        "LoginData",
        JSON.stringify({ role: "user", username })
      );
      navigate("/");
    }
  };

  return (
    <div className="login-wrapper">
      {/* Left Image Section */}
      <div className="login-image">
         <img src={loginYt} alt="Login"/>
      </div>
      {/* Right Login Form */}
      <div className="login-form">
        <h2>Hello Again,</h2>
        <p>Welcome back, let's get started!</p>

        <input
          type="text"
          placeholder="Username"
          className="input-box"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="input-box"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="error">{error}</p>}

        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
