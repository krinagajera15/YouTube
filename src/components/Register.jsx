import React, { useState } from "react";
import "./Register.css";
import loginYt from "../assets/image/yt.png";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    setError("");

    const { username, email, password, confirmPassword } = formData;

    if (!username || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("https://697343e3b5f46f8b5826ae3f.mockapi.io/users");
      const users = await res.json();

      const emailExists = users.some((u) => u.email === email);
      if (emailExists) {
        setError("Email already registered. Please login.");
        return;
      }

      const response = await fetch("https://697343e3b5f46f8b5826ae3f.mockapi.io/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) throw new Error("Failed to register user");

      const data = await response.json();
      console.log("User created:", data);

      alert("Registration Successful!");
      navigate("/login"); 
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="register-wrapper">
    
      <div className="register-image">
        <img src={loginYt} alt="Register" />
      </div>

      <div className="register-form">
        <h2>Create Account</h2>
        <p>Sign up to get started</p>

        <input
          type="text"
          name="username"
          placeholder="Username"
          className="input-box"
          value={formData.username}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input-box"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input-box"
          value={formData.password}
          onChange={handleChange}
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="input-box"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        {error && <p className="error">{error}</p>}

        <button className="register-btn" onClick={handleRegister}>
          Sign Up
        </button>

        <p className="signin-text">
          Already have an account?{" "}
          <Link to="/login" className="signin-link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
