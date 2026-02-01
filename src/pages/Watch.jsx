import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Watch.css";

const Watch = () => {
  const { id } = useParams(); // URL માંથી ID લેશે (1, 2, 3...)
  const [video, setVideo] = useState(null);

  useEffect(() => {
    // API માંથી ચોક્કસ ID વાળો ડેટા ફેચ કરવો
    fetch(`https://697343e3b5f46f8b5826ae3f.mockapi.io/videos/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Video not found");
        return res.json();
      })
      .then((data) => setVideo(data))
      .catch((err) => console.error("Error fetching video:", err));
  }, [id]);

  if (!video) return <div className="watch-page" style={{color: 'white', padding: '20px'}}>Loading Video...</div>;

  return (
    <div className="watch-page">
      <div className="video-container">
        {/* YouTube Embed URL નો ઉપયોગ */}
        <iframe
          width="100%"
          height="500px"
          src={video.url} 
          title={video.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="video-details" style={{ color: "white", padding: "20px" }}>
        <h1>{video.title}</h1>
        <p style={{ color: "#aaa" }}>{video.channel}</p>
      </div>
    </div>
  );
};

export default Watch;