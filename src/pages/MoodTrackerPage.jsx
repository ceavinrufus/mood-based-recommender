import React, { useState } from "react";
import axios from "axios";
import NumericStepper from "../components/NumericStepper";
import { apiConfig } from "../config/APIConfig";

function MoodTracker() {
  const [movRecommendations, setMovRecommendations] = useState([]);
  const [bevRecommendations, setBevRecommendations] = useState([]);
  const [mood, setMood] = useState("");
  const [maxAmount, setMaxAmount] = useState(1);
  const [idle, setIdle] = useState(true);
  const [entry, setEntry] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    // Make the POST request using Axios
    const storedToken = sessionStorage.getItem("accessToken") || "";
    setIdle(false);
    setLoading(true);
    setMood("");
    axios
      .post(
        `${apiConfig.mood_rec}/moods/recommendations/?input=${entry}&max_amount=${maxAmount}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      )
      .then((response) => {
        // Handle the successful response
        setMovRecommendations(response.data.results.movie_recommendations); // Update state with movie recommendations
        setBevRecommendations(response.data.results.beverage_recommendations); // Update state with movie recommendations
        setMood(response.data.results.mood); // Update state with mood
        setLoading(false);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error fetching recommendations:", error);
        setLoading(false);
      });
  };

  return (
    <div className="w-screen h-screen bg-black text-white flex flex-col justify-center items-center ">
      <div className="flex flex-col p-10 rounded-xl gap-6 border w-[600px]">
        <h1 className="text-4xl font-bold mb-4 text-center">
          Mood Based Recommender
        </h1>
        <div className="flex flex-col gap-2 w-full">
          <label className="text-left">Enter your text</label>
          <textarea
            placeholder="Enter a text"
            className="px-2 py-1 rounded-md text-black flex w-full"
            type="text"
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
          ></textarea>
          <div className="flex items-center w-full justify-between">
            <div className="">
              <label>Number of recommendation</label>
              <NumericStepper value={maxAmount} onChange={setMaxAmount} />
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              style={{ height: "min-content" }}
              onClick={handleClick}
            >
              Generate!
            </button>
          </div>
        </div>

        <div className="w-full">
          <div className={`text-center ${idle && "invisible"}`}>
            {loading ? (
              <span className="animate-ellipsis">Detecting mood</span>
            ) : (
              <span>
                Detected mood:{" "}
                <span className="capitalize font-bold text-blue-500">
                  {mood}
                </span>
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div
            className={`h-full duration-500 overflow-auto flex flex-col gap-4 ${
              !loading ? "max-h-[400px]" : "max-h-[0px]"
            }`}
          >
            {movRecommendations.length > 0 && (
              <div className="w-full">
                <h3 className="text-xl mb-2">Movie Recommendations:</h3>
                {movRecommendations.map((recommendation, index) => (
                  <li key={index}>{recommendation.title}</li>
                ))}
              </div>
            )}
            {bevRecommendations.length > 0 && (
              <div className="w-full">
                <h3 className="text-xl mb-2">Beverage Recommendations:</h3>
                {bevRecommendations.map((recommendation, index) => (
                  <li key={index}>{recommendation.name}</li>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoodTracker;
