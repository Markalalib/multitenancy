import React, { useState } from "react";
import "./LoginPage.css";
import axios from "axios";
export default function LoginPage({ onLogin }) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
 const [message,setMessage] = useState("");
  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   
    try {
      // ✅ Call your backend API
      const response = await axios.post("http://localhost:5000/api/login", {
        username: credentials.username,
        password: credentials.password,
      });

      console.log("Response:", response.data);
      setMessage(response.data.message);

      if (response.data.status === "success") {
        alert("✅ Login Successful!");
        if (onLogin) onLogin();
      } else {
        alert("❌ " + response.data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome Back 👋</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            value={credentials.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
           {message && (
          <p
            style={{
              marginTop: "15px",
              color: message.includes("success") ? "green" : "red",
              textAlign: "center",
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
