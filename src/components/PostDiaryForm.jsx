import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiConfig } from "../config/APIConfig";

function PostDiaryForm({ onSubmit }) {
  const [newDiary, setNewDiary] = useState({});
  const storedToken = sessionStorage.getItem("accessToken");

  const addDiary = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${apiConfig.mood_rec}/moods`,
        { ...newDiary, datetime: new Date() },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
      alert("New diary added!");
      setNewDiary({});
      onSubmit();
    } catch (error) {
      console.error("Error adding diary:", error);
    }
  };
  return (
    <div className="w-full">
      <div className="bg-gray-200 p-4 rounded-md w-full gap-4 flex flex-col">
        <h2 className="text-2xl font-bold">Dear Diary...</h2>
        <form className="w-full gap-2 flex flex-col" onSubmit={addDiary}>
          <textarea
            type="text"
            className="px-2 py-1 rounded-md w-full"
            placeholder="What's in your mind?"
            value={newDiary.notes || ""}
            onChange={(e) =>
              setNewDiary({
                ...newDiary,
                notes: e.target.value,
              })
            }
          />
          <input
            type="text"
            className="px-2 py-1 rounded-md w-full"
            placeholder="What's your mood?"
            value={newDiary.mood || ""}
            onChange={(e) =>
              setNewDiary({
                ...newDiary,
                mood: e.target.value.toLowerCase(),
              })
            }
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            type="submit"
          >
            Add Diary
          </button>
        </form>
      </div>
    </div>
  );
}

export default PostDiaryForm;
