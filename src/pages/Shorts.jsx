import React, { useContext, useEffect, useState } from "react";
import "./Shorts.css";
import Modecontext from "../Context/ModeContext";

const Shorts = () => {
  const [shorts, setShorts] = useState([]);

    const ctx=useContext(Modecontext);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("shorts")) || [];
    setShorts(data);
  }, []);

  return (
    <div className={`shorts-class ${ctx?.mode}`}>
    <div className="shorts-container">
      {shorts.length === 0 && (
        <h2>
          No Shorts Available
        </h2>
      )}

      {shorts.map((short) => (
        <div className="short-card" key={short.id}>
          
          {/* ✅ SAFE EMBED */}
          <iframe
            src={`https://www.youtube.com/embed/${short.videoId}?controls=1&rel=0`}
            title={short.title}
            frameBorder="0"
            allow="encrypted-media"
            allowFullScreen
          ></iframe>

          <div className="short-info">
            <p>{short.title}</p>

            <div className="short-actions">
              ❤️ {short.likes}
              <span style={{ marginLeft: 10 }}>
                💬 {short.comments}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Shorts;
