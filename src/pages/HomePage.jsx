import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiConfig } from "../config/APIConfig";
import EditDiaryModal from "../components/EditDiaryModal";

const HomePage = () => {
  const [diaries, setDiaries] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [datetime, setDatetime] = useState(null);
  const [newDiary, setNewDiary] = useState({});

  const storedToken = sessionStorage.getItem("accessToken");

  const options = {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  // Fetch diaries for the logged-in user
  const fetchDiaries = async () => {
    try {
      const response = await axios.get(`${apiConfig.mood_rec}/moods`, {
        headers: {
          Authorization: `Bearer ${storedToken}`, // Include the authorization header
        },
      });
      setDiaries(response.data.results);
    } catch (error) {
      console.error("Error fetching diaries:", error);
    }
  };

  // Add a new diary entry
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
      fetchDiaries(); // Refresh the diary list after adding a new entry
    } catch (error) {
      console.error("Error adding diary:", error);
    }
  };

  // Remove a diary entry
  const removeDiary = async (datetime) => {
    try {
      await axios.delete(
        `https://tubes-tst-18221162.azure-api.net/mood-based-recommendation/moods/${datetime}`,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
      alert("Diary deleted successfully");
      fetchDiaries(); // Refresh the diary list after deleting an entry
    } catch (error) {
      console.error("Error deleting diary:", error);
    }
  };

  // Update an existing diary entry
  const toggleModal = (datetime) => {
    setDatetime(datetime);
    setIsOpen(true);
  };

  useEffect(() => {
    fetchDiaries(); // Fetch diaries when the component mounts
  }, [isOpen]);

  return (
    <>
      <div className="pt-40 pb-20 px-20 gap-20 flex bg-black w-screen h-screen">
        <div className="flex w-4/5 gap-10">
          <h1 className="text-5xl w-1/4 text-white">Dear Diary...</h1>
          <div className="flex flex-wrap gap-2 w-3/4">
            {diaries.map((diary) => (
              <div
                className="p-4 h-60 w-80 rounded-xl bg-white flex flex-col justify-between"
                key={diary.datetime}
              >
                <div className="flex flex-col gap-2">
                  <p className="text-gray-400">
                    {Intl.DateTimeFormat("id-ID", options).format(
                      new Date(diary.datetime)
                    )}
                  </p>
                  <p>{diary.notes}</p>
                </div>
                <div className="flex justify-end gap-2">
                  {/* Add edit functionality */}
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                    onClick={() => {
                      toggleModal(diary.datetime);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                    onClick={() => removeDiary(diary.datetime)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add form for adding new diaries */}
        <div className="w-1/5">
          <div className="bg-gray-200 p-4 rounded-md w-full gap-4 flex flex-col">
            <h2 className="text-2xl font-bold">Add New Diary</h2>
            <form className="w-full gap-2 flex flex-col" onSubmit={addDiary}>
              <input
                type="text"
                className="px-2 py-1 rounded-md w-full"
                placeholder="What's in your thoughts?"
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
      </div>
      {/* Add form for editing diaries */}
      {isOpen && <EditDiaryModal datetime={datetime} setIsOpen={setIsOpen} />}
    </>
  );
};

export default HomePage;
