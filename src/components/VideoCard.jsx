import React from "react";
import { useNavigate } from "react-router-dom";
import "./VideoCard.css";

const VideoCard = ({ video, isAdmin, onEdit, onDelete }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/watch/${video.id}`);
  };

  const formatDuration = (duration) => {
    if (!duration) return "00:00";
    if (typeof duration === "string" && duration.includes(":")) return duration;
    
    const mins = Math.floor(duration / 60);
    const secs = Math.floor(duration % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="video-card" onClick={handleClick}>
      <div className="thumbnail-wrapper">
        <img src={video.thumbnail} alt={video.title} />
        <span className="duration">
          {video.duration ? formatDuration(video.duration) : "00:00"}
        </span>

        {/* Admin Buttons જો રોલ એડમિન હોય તો */}
        {isAdmin && (
          <div className="admin-overlay" onClick={(e) => e.stopPropagation()}>
            <button className="edit-btn" onClick={() => onEdit(video.id)}>Edit</button>
            <button className="delete-btn" onClick={() => onDelete(video.id)}>Delete</button>
          </div>
        )}
      </div>
      
      <div className="video-info">
        <h3 className="video-title">{video.title}</h3>
        <p className="video-channel">{video.channel}</p>
      </div>
    </div>
  );
};

export default VideoCard;