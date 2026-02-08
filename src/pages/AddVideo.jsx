import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./AddVideo.css";
import Modecontext from "../Context/ModeContext";

const AddVideo = () => {
  const [formData, setFormData] = useState({
    title: "",
    channel: "",
    channelImage: "", 
    thumbnail: "",
    url: "",
    duration: ""
  });
  const [channels, setChannels] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const ctx = useContext(Modecontext);
  const theme = ctx?.mode || "light";

  useEffect(() => {
    fetch("https://69809eaa6570ee87d50fd891.mockapi.io/channelsdata")
      .then((res) => res.json())
      .then((data) => setChannels(data))
      .catch((err) => console.error("Error fetching channels:", err));
  }, []);

  useEffect(() => {
    if (location.state?.channel) {
      const { c_name, c_image } = location.state.channel;
      setFormData((prev) => ({ 
        ...prev, 
        channel: c_name, 
        channelImage: c_image 
      }));
    }
  }, [location.state]);

  const getYouTubeID = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "channel") {
      // Input field માં નામ લખતા જ ચેનલ શોધશે
      const selectedChannel = channels.find(
        (ch) => ch.c_name.toLowerCase() === value.toLowerCase()
      );
      
      setFormData({
        ...formData,
        channel: value,
        channelImage: selectedChannel ? selectedChannel.c_image : "" 
      });
    } else if (name === "url") {
      const videoId = getYouTubeID(value);
      if (videoId) {
        setFormData({
          ...formData,
          url: `https://www.youtube.com/embed/${videoId}`,
          thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        });
      } else {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://697343e3b5f46f8b5826ae3f.mockapi.io/videos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Video Added Successfully! 🎉");
        navigate("/");
      })
      .catch((err) => console.error("Error adding video:", err));
  };

  return (
    <div className={`add-video-container ${theme}`}>
      <div className="add-video-card">
        <h2>Add New YouTube Video</h2>
        <form onSubmit={handleSubmit} className="add-video-form">
          
          <div className="input-group">
            <label>Video Title</label>
            <input name="title" placeholder="Enter video title" value={formData.title} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Channel Name</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {/* Dropdown ને બદલે હવે સાદું Input Field છે */}
              <input 
                name="channel" 
                placeholder="Type channel name" 
                value={formData.channel} 
                onChange={handleChange} 
                required 
                // list="channel-suggestions" // આનાથી ટાઈપ કરતી વખતે નીચે સૂચનો (suggestions) દેખાશે
                style={{ flex: 1 }}
                disabled
              />
              {/* Datalist યુઝરને નામ પસંદ કરવામાં મદદ કરશે */}
              <datalist id="channel-suggestions">
                {channels.map((ch) => (
                  <option key={ch.id} value={ch.c_name} />
                ))}
              </datalist>

              {/* ચેનલનો લોગો પ્રીવ્યૂ */}
              {formData.channelImage && (
                <img 
                  src={formData.channelImage} 
                  alt="Logo" 
                  style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #ccc' }} 
                />
              )}
            </div>
          </div>

          <div className="input-group">
            <label>YouTube URL</label>
            <input name="url" placeholder="Paste YouTube link here" value={formData.url} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Video Duration (e.g. 10:05)</label>
            <input name="duration" placeholder="Enter duration" value={formData.duration} onChange={handleChange} required />
          </div>

          <div style={{ display: 'flex', gap: '20px' }}>
             {formData.thumbnail && (
                <div className="thumbnail-preview">
                  <p>Video Thumbnail:</p>
                  <img src={formData.thumbnail} alt="Preview" style={{ width: '150px' }} />
                </div>
              )}
          </div>

          <button type="submit" className="upload-btn">UPLOAD VIDEO</button>
        </form>
      </div>
    </div>
  );
};

export default AddVideo;