import React from "react";
import { useNavigate } from "react-router-dom";
import "./VideoCard.css";

const VideoCard = ({ video }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/watch/${video.id}`);
  };

  // સેકન્ડ્સને MM:SS ફોર્મેટમાં ફેરવવા માટેનું ફંક્શન
  const formatDuration = (duration) => {
    if (!duration) return "00:00";
    // જો ડ્યુરેશન ઓલરેડી સ્ટ્રિંગ (દા.ત. "10:05") હોય તો સીધું રિટર્ન કરો
    if (typeof duration === "string" && duration.includes(":")) return duration;
    
    // જો સેકન્ડ્સમાં હોય તો કેલ્ક્યુલેટ કરો
    const mins = Math.floor(duration / 60);
    const secs = Math.floor(duration % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="video-card" onClick={() => navigate(`/watch/${video.id}`)}>
      <div className="thumbnail-wrapper">
        <img src={video.thumbnail} alt={video.title} />
        {/* જો API માં duration હશે તો જ દેખાશે, નહીંતર ખાલી રહેશે */}
        <span className="duration">
          {video.duration ? video.duration : "00:00"}
        </span>
      </div>
      <div className="video-info">
        <h3 className="video-title">{video.title}</h3>
        <p className="video-channel">{video.channel}</p>
      </div>
    </div>
  );
};

export default VideoCard;