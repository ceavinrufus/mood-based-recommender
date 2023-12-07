import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const isAuthenticated = () => {
      const accessToken = sessionStorage.getItem("accessToken");
      if (accessToken) {
        try {
          const decodedToken = jwtDecode(accessToken);
          const currentTime = Date.now() / 1000;

          setIsLoggedIn(decodedToken.exp > currentTime);
        } catch (error) {
          console.error("Error decoding access token:", error);
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
    };
    isAuthenticated();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    navigate("/auth");
  };

  return (
    <nav className="bg-gray-900 text-white absolute w-full h-20 flex">
      <div className="container mx-auto py-4 flex justify-between items-center">
        <a href="/" className="text-2xl">
          Moods<span className="font-bold">Diary</span>
        </a>
        <div className="flex gap-8 items-center">
          <div className="">
            <a
              href="/"
              className="hover:bg-gray-800 px-4 py-2 rounded-md transition duration-300 ease-in-out"
            >
              Home
            </a>
            <a
              href="/recommender"
              className="hover:bg-gray-800 px-4 py-2 rounded-md transition duration-300 ease-in-out"
            >
              Recommender
            </a>
          </div>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md"
            >
              Logout
            </button>
          ) : (
            <a
              href="/auth"
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
            >
              Login
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
