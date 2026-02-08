import React, { useEffect, useState } from "react";
import "./ChanelDashbord.css";

const ChannelDashboard = () => {
  const [channelData, setChannelData] = useState(null);
  const [myVideos, setMyVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ૧. LocalStorage માંથી ચેનલની વિગત લો
    const savedChannel = JSON.parse(localStorage.getItem("userChannel"));
    setChannelData(savedChannel || {
      name: "Your Channel",
      handle: "@user123",
      subscribers: "1.2M",
      banner: "https://via.placeholder.com/1500x300",
      avatar: "https://via.placeholder.com/100"
    });

    // ૨. API માંથી આ ચેનલના વિડિયો ફેચ કરો
    const fetchMyVideos = async () => {
      try {
        const res = await fetch("https://697343e3b5f46f8b5826ae3f.mockapi.io/videos");
        const data = await res.json();
        // માત્ર આ ચેનલના જ વિડિયો ફિલ્ટર કરો (ધારો કે ચેનલનું નામ મેચ થાય છે)
        setMyVideos(data.slice(0, 4)); // એક્ઝામ્પલ માટે પહેલા 4 વિડિયો
      } catch (err) {
        console.error("Error fetching videos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyVideos();
  }, []);

  return (
    <div className="dashboard-container">
      {/* Banner Section */}
      <div className="channel-banner">
        <img src={channelData.banner} alt="Banner" />
      </div>

      {/* Profile Info Section */}
      <div className="channel-header">
        <div className="header-left">
          <img src={channelData.avatar} alt="Avatar" className="dashboard-avatar" />
          <div className="header-text">
            <h1>{channelData.name}</h1>
            <p>{channelData.handle} • {channelData.subscribers} subscribers</p>
            <button className="customize-btn">Customize channel</button>
            <button className="manage-btn">Manage videos</button>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="dashboard-tabs">
        <span className="active-tab">Home</span>
        <span>Videos</span>
        <span>Playlists</span>
        <span>Community</span>
      </div>

      <hr className="tab-divider" />

      {/* My Videos Section */}
      <div className="my-videos-section">
        <h3>Videos</h3>
        <div className="videos-grid">
          {myVideos.map((video) => (
            <div key={video.id} className="video-item">
              <img src={video.thumbnail} alt={video.title} />
              <h4>{video.title}</h4>
              <p>{video.views} views • 2 days ago</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChannelDashboard;