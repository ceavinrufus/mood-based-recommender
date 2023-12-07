import React, { useState, useEffect } from "react";
import { apiConfig } from "../config/APIConfig";
import axios from "axios";

function EditDiaryModal({ datetime, setIsOpen, onSubmit }) {
  const [diary, setDiary] = useState({}); // State to store new diary details
  const storedToken = sessionStorage.getItem("accessToken");

  const fetchDiaries = async () => {
    try {
      const response = await axios.get(
        `${apiConfig.mood_rec}/moods/datetime/${datetime}`,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`, // Include the authorization header
          },
        }
      );
      setDiary(response.data.results);
    } catch (error) {
      console.error("Error fetching diaries:", error);
    }
  };

  useEffect(() => {
    fetchDiaries(); // Fetch diaries when the component mounts
  }, []);

  const editDiary = async (datetime) => {
    try {
      await axios.put(
        `${apiConfig.mood_rec}/moods/${datetime}`,
        {
          mood: diary.mood,
          notes: diary.notes,
          datetime: diary.datetime,
        },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
      alert("Diary updated successfully");
      setDiary({});
      setIsOpen(false);
      onSubmit();
    } catch (error) {
      console.error("Error updating diary:", error);
      alert("You can't edit this diary!");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-gray-200 p-4 rounded-md gap-4 flex flex-col w-1/4">
        <h2 className="text-2xl font-bold">Edit Diary </h2>
        <form
          className="w-full gap-2 flex flex-col"
          onSubmit={(e) => {
            e.preventDefault();
            editDiary(diary.datetime);
          }}
        >
          <label htmlFor="notes">Notes</label>
          <textarea
            type="text"
            className="px-2 py-1 rounded-md w-full"
            placeholder="What's in your mind?"
            value={diary?.notes || ""}
            onChange={(e) => {
              setDiary({ ...diary, notes: e.target.value });
            }}
          />
          <label htmlFor="Mood">Mood</label>
          <input
            type="text"
            className="px-2 py-1 rounded-md w-full"
            placeholder="What's your mood?"
            value={diary?.mood || ""}
            onChange={(e) => {
              setDiary({ ...diary, mood: e.target.value.toLowerCase() });
            }}
          />
          <div className="flex justify-end gap-2">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(false);
              }}
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              type="submit"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditDiaryModal;
