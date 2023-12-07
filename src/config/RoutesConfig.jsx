import React from "react";
import { Route, Routes } from "react-router-dom";
import MoodTracker from "../pages/MoodTracker";

const RoutesConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<MoodTracker />} />
    </Routes>
  );
};

export default RoutesConfig;
