import React, { useContext, useEffect, useState } from "react";
import VideoCard from "../components/VideoCard";
import "./Home.css";
import Modecontext from "../Context/ModeContext";
import { v4 as uuidv4 } from "uuid"; 
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const ctx = useContext(Modecontext);
  const theme = ctx?.mode || 'light';
  const navigate = useNavigate();

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const loggedInUserData = JSON.parse(localStorage.getItem("loginData")) || {};

  const fetchVideos = async () => {
    try {
      const response = await fetch("https://697343e3b5f46f8b5826ae3f.mockapi.io/videos");
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setVideos(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleEdit = (id) => alert("Edit video id: " + id);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;
    try {
      const response = await fetch(`https://697343e3b5f46f8b5826ae3f.mockapi.io/videos/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setVideos((prev) => prev.filter((v) => v.id !== id));
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleVideoClick = (originalId) => {
    const fakeUuid = uuidv4();
    // જો તમે ઈચ્છો છો કે બેક બટન દબાવતા સીધું હોમ પર જવાય, 
    // તો અહીં કોઈ વધારાની હિસ્ટ્રી પુશ ન થાય તેનું ધ્યાન રાખવું.
    navigate(`/watch/${originalId}?vid=${fakeUuid}`);
  };

  return (
    <div className={`home ${theme}`}>
      <h2>Latest Videos</h2>
      <div className="video-grid">
        {videos.map((video) => (
          <div 
            key={video.id} 
            onClick={() => handleVideoClick(video.id)} 
            style={{ cursor: 'pointer' }}
          >
            <VideoCard
              video={video}
              isAdmin={loggedInUserData?.role === "admin"}
              onEdit={(e) => { 
                e.stopPropagation(); // ક્લિક ઇવેન્ટને રોકવા માટે
                handleEdit(video.id); 
              }}
              onDelete={(e) => { 
                e.stopPropagation(); // ક્લિક ઇવેન્ટને રોકવા માટે
                handleDelete(video.id); 
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;