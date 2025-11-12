// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import "./LoginPage.css";

function LoginPage({ onLoginSuccess }) { // ✅ get callback from App.js
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ simple validation for demo
    if (username === "admin" && password === "1234") {
      alert("Login successful!");
      onLoginSuccess(); // ✅ tell App.js to show dashboard
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <h3 className="login-title">Login</h3>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <div className="d-grid">
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default LoginPage;
