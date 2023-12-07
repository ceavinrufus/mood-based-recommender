import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiConfig } from "../config/APIConfig";
import EditDiaryModal from "../components/EditDiaryModal";
import PostDiaryForm from "../components/PostDiaryForm";

const HomePage = () => {
  const [diaries, setDiaries] = useState([]);
  const [profile, setProfile] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [datetime, setDatetime] = useState(null);
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
    setIsLoading(true);
    try {
      const response = await axios.get(`${apiConfig.mood_rec}/moods`, {
        headers: {
          Authorization: `Bearer ${storedToken}`, // Include the authorization header
        },
      });
      setDiaries(response.data.results);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching diaries:", error);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${apiConfig.mood_rec}/users/me`, {
          headers: {
            Authorization: `Bearer ${storedToken}`, // Include the authorization header
          },
        });
        console.log(response.data);
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching diaries:", error);
      }
    };
    fetchProfile();
  }, []);

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
  }, []);

  return (
    <>
      <div className="pt-40 pb-20 px-20 gap-20 flex bg-black w-screen min-h-screen">
        {!isLoading ? (
          <div className="flex gap-20 w-full">
            <div className="w-1/4 gap-10 flex flex-col">
              <div className="text-4xl text-white">
                {profile?.full_name}'s Diary
              </div>
              <PostDiaryForm onSubmit={fetchDiaries} />
              <p className="text-xl text-white">
                Try the mood-based recommender by clicking the link{" "}
                <a className="underline text-blue-500" href="/recommender">
                  here!
                </a>
              </p>
            </div>
            <div className="flex flex-wrap gap-8 w-3/4 h-min">
              {diaries.map((diary) => (
                <div
                  className="p-4 h-80 w-80 rounded-xl bg-white flex flex-col justify-between"
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
                  <div className="flex items-center justify-between">
                    <div className="capitalize">
                      Mood:{" "}
                      <span className="text-blue-500 font-bold">
                        {diary.mood}
                      </span>
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
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="animate-ellipsis text-white text-2xl flex justify-center w-full h-full items-center">
            Loading
          </div>
        )}
      </div>
      {/* Add form for editing diaries */}
      {isOpen && (
        <EditDiaryModal
          datetime={datetime}
          setIsOpen={setIsOpen}
          onSubmit={fetchDiaries}
        />
      )}
    </>
  );
};

export default HomePage;
