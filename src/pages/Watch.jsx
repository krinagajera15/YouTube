import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import "./Watch.css";
import { MdThumbUpOffAlt, MdThumbDownOffAlt, MdNotificationsNone, MdShare, MdPlaylistAdd, MdClose } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";

const Watch = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [video, setVideo] = useState(null);
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false); // Modal state

  // લોગિન ડેટા ચેક કરવા માટે
  const loginData = JSON.parse(localStorage.getItem("loginData"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resVideo = await fetch(`https://697343e3b5f46f8b5826ae3f.mockapi.io/videos/${id}`);
        if (!resVideo.ok) throw new Error("Video not found");
        const videoData = await resVideo.json();
        setVideo(videoData);

        // સબ્સ્ક્રિપ્શન સ્ટેટ ચેક કરો
        const savedSubs = JSON.parse(localStorage.getItem("subscribedChannels")) || [];
        const alreadySubscribed = savedSubs.some(item => item.id === videoData.id);
        setIsSubscribed(alreadySubscribed);

        const resAll = await fetch(`https://697343e3b5f46f8b5826ae3f.mockapi.io/videos`);
        const allData = await resAll.json();
        setVideos(allData.filter((v) => v.id !== id));
        setError("");
      } catch (err) {
        setError("Video loading Error 😕");
      }
    };
    fetchData();
    window.scrollTo(0, 0);
  }, [id]);

  const handleSubscribe = () => {
    // જો યુઝર લોગિન નથી, તો મોડલ બતાવો
    if (!loginData) {
      setShowLoginModal(true);
      return;
    }

    let savedSubs = JSON.parse(localStorage.getItem("subscribedChannels")) || [];

    if (isSubscribed) {
      savedSubs = savedSubs.filter(item => item.id !== video.id);
    } else {
      const newSub = {
        id: video.id,
        channel: video.channel || "Unknown Channel",
        channelImage: video.channelImage
      };
      savedSubs.push(newSub);
    }

    localStorage.setItem("subscribedChannels", JSON.stringify(savedSubs));
    setIsSubscribed(!isSubscribed);
  };

  if (error) return <div className="watch-page error-text">{error}</div>;
  if (!video) return <div className="watch-page loading-text">Loading...</div>;

  return (
    <div className="watch-container">
      <div className="watch-main">
        {/* Video Player */}
        <div className="video-container">
          <iframe src={video.url} title={video.title} frameBorder="0" allowFullScreen></iframe>
        </div>

        {/* Video Info */}
        <div className="video-details">
          <h1 className="watch-title">{video.title}</h1>
          <div className="video-actions-row">
            <div className="channel-info">
              <img src={video.channelImage || "https://via.placeholder.com/40"} className="channel-avatar-img" alt="channel" />
              <div>
                <p className="channel-name">{video.channel || "Channel Name"}</p>
                <p className="sub-count">1.2M subscribers</p>
              </div>
              <button 
                className={`subscribe-btn ${isSubscribed ? "subscribed" : ""}`} 
                onClick={handleSubscribe}
              >
                {isSubscribed ? (
                  <>Subscribed <MdNotificationsNone size={20} style={{ marginLeft: "8px" }} /></>
                ) : (
                  "Subscribe"
                )}
              </button>
            </div>

            <div className="action-buttons">
              <div className="like-dislike-group">
                <button><MdThumbUpOffAlt size={20} /> Like</button>
                <div className="divider"></div>
                <button><MdThumbDownOffAlt size={20} /></button>
              </div>
              <button><MdShare size={20} /> Share</button>
              <button><MdPlaylistAdd size={20} /> Save</button>
            </div>
          </div>
        </div>
      </div>

      {/* --- Login Modal --- */}
      {showLoginModal && (
        <div className="modal-overlay">
          <div className="login-modal">
            <button className="close-modal" onClick={() => setShowLoginModal(false)}>
              <MdClose size={24} />
            </button>
            <h2>Want to subscribe to this channel?</h2>
            <p>Sign in to subscribe to this channel and stay updated.</p>
            <button className="modal-signin-btn" onClick={() => navigate("/login")}>
              Sign In
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Watch;