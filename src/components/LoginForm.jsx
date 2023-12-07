import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { apiConfig } from "../config/APIConfig";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        apiConfig.login,
        {
          username: username,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const accessToken = response.data.access_token;

      // Store tokens in sessionStorage
      sessionStorage.setItem("accessToken", accessToken);

      // Redirect to "/" after successful login
      navigate("/");
    } catch (error) {
      // Handle login error
      console.error("Login error:", error);
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4">
      <div className="flex flex-col">
        <label htmlFor="username" className="mb-1">
          Username:
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border rounded-md px-2 py-1 text-black"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="password" className="mb-1">
          Password:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded-md px-2 py-1 text-black"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition mt-8"
      >
        Login
      </button>
    </form>
  );
}

export default LoginForm;
