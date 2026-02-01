import React, { useEffect, useState } from "react";
import VideoCard from "../components/VideoCard";
import "./Home.css";

const Home = () => {
  const [videos, setVideos] = useState([]);

  // ✅ logged in user data (safe)
  const loggedInUserData =
    JSON.parse(localStorage.getItem("loginData")) || {};

  useEffect(() => {
    fetch("https://697343e3b5f46f8b5826ae3f.mockapi.io/videos")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched data:", data);
        setVideos(data);
      })
      .catch((err) => console.log("Fetch error:", err));
  }, []);

  // ✅ Edit handler
  const handleEdit = (id) => {
    alert("Edit video id: " + id);
    // later navigate(`/edit/${id}`)
  };

  // ✅ Delete handler
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;

    fetch(`https://697343e3b5f46f8b5826ae3f.mockapi.io/videos/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setVideos((prev) => prev.filter((v) => v.id !== id));
      });
  };

  return (
    <div className="home">
      <h2>Latest Videos</h2>

      <div className="video-grid">
        {videos.map((video) => (
          <VideoCard
            key={video.id}   // ✅ important
            video={video}
            isAdmin={loggedInUserData?.role === "admin"}
            onEdit={() => handleEdit(video.id)}
            onDelete={() => handleDelete(video.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
