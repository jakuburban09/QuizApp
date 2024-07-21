// src/components/Login.js
import React, { useState } from "react";
import axios from "axios";
import baseURL from "config";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${baseURL}/login`, {
        username,
        password,
      });
      alert("User logged in successfully");
    } catch (error) {
      console.error("Error logging in user", error);
      alert("Error logging in user");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
