import React, { useContext, useState, useEffect } from "react";
import "./AddShorts.css";
import Modecontext from "../Context/ModeContext";

const AddShorts = () => {
  const ctx = useContext(Modecontext);
  const [title, setTitle] = useState("");
  const [videoId, setVideoId] = useState("");
  const [currentChannel, setCurrentChannel] = useState(null);

  useEffect(() => {
    const loginData = JSON.parse(localStorage.getItem("loginData"));
    const allChannels = JSON.parse(localStorage.getItem("userChannels")) || {};

    if (loginData && loginData.email) {
      const userChannel = allChannels[loginData.email];
      if (userChannel) {
        setCurrentChannel(userChannel);
      }
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!currentChannel) {
      alert("Please create a channel first!");
      return;
    }

    if (!title || !videoId) {
      alert("Title and Video ID required");
      return;
    }

    const newShort = {
      id: Date.now().toString(), 
      videoId: videoId,
      title: title,
      likes: 0,
      comments: 0,
      type: "shorts", 
      channel: currentChannel.c_name,
      userEmail: currentChannel.userEmail, 
      c_image: currentChannel.c_image, 
    };

    const oldShorts = JSON.parse(localStorage.getItem("shorts")) || [];
    localStorage.setItem("shorts", JSON.stringify([newShort, ...oldShorts]));

    setTitle("");
    setVideoId("");
    alert(`Short Added to ${currentChannel.c_name} Successfully`);
  };

  return (
    <div className={`add-shorts-container ${ctx?.mode}`}>
      <div className="add-shorts-card">
        <h2>Add Shorts</h2>

        {currentChannel && (
          <div className="channel-preview-short">
            <img src={currentChannel.c_image} alt="logo" style={{width:'40px', height:'40px', borderRadius:'50%'}} />
            <span>Posting as: <b>{currentChannel.c_name}</b></span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Short Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            placeholder="YouTube Video ID (e.g. UBDocfEiFlA)"
            value={videoId}
            onChange={(e) => setVideoId(e.target.value)}
          />

          <button type="submit" disabled={!currentChannel}>
            {currentChannel ? "Add Short" : "No Channel Found"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddShorts;