import React, { useState } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import baseURL from "config";
import Navbar from "./bricks/Navbar";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const history = useHistory();
  const { lng } = useParams<{ lng: string }>();

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${baseURL}/api/login`, {
        username,
        password,
      }, {
        withCredentials: true, // Ensure cookies are sent
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log("Response data: ", response.data);

      if (response.status === 200) {
        history.push(`/${lng}/createQuiz`);
      } else {
        setError("Login failed: " + response.statusText);
      }
    } catch (error: any) {
      console.error("Error logging in user", error);
      setError(error.response?.data || "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
    </div>
  );
};

export default Login;
