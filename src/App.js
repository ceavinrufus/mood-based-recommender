import React from "react";
import "./App.css";
import RoutesConfig from "./config/RoutesConfig";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="">
      <Navbar />
      <RoutesConfig />
      <Footer />
    </div>
  );
}

export default App;
