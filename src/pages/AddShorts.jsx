import React, { useContext, useState } from "react";
import "./AddShorts.css";
import Modecontext from "../Context/ModeContext";

const AddShorts = () => {
  const ctx=useContext(Modecontext);
  const [title, setTitle] = useState("");
  const [videoId, setVideoId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !videoId) {
      alert("Title and Video ID required");
      return;
    }

    const newShort = {
      id: Date.now(),
      videoId,
      title,
      likes: 0,
      comments: 0,
    };

    const oldShorts = JSON.parse(localStorage.getItem("shorts")) || [];
    localStorage.setItem("shorts", JSON.stringify([newShort, ...oldShorts]));

    setTitle("");
    setVideoId("");
    alert("Short Added Successfully ✅");
  };

  return (
    <div className={`add-shorts-container ${ctx?.mode}`}>
      <div className="add-shorts-card">
        <h2>Add Shorts</h2>

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

          <button type="submit">Add Short</button>
        </form>
      </div>
    </div>
  );
};

export default AddShorts;
