import React from "react";
import "./App.css";
import RoutesConfig from "./config/RoutesConfig";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="w-screen">
      <Navbar />
      <RoutesConfig />
    </div>
  );
}

export default App;
