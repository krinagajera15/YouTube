// import React from "react";
// import "./Shorts.css";

// const shortsData = [
//   {
//     id: 1,
//     videoId: "UBDocfEiFlA",
//     title: "React Tips 🔥",
//     likes: 928,
//     comments: 12,
//   },
//   {
//     id: 4,
//     videoId: "oy8lS29ckr4",
//     title:"prret re",
//     likes:900,
//     comments:56
//   },
//   {
//     id: 3,
//     videoId: "dQw4w9WgXcQ",
//     title: "JavaScript Shorts ⚡",
//     likes: 1200,
//     comments: 48,
//   },
// ];

// const Shorts = () => {
//   return (
//     <div className="shorts-container">
//       {shortsData.map((short) => (
//         <div className="short-card" key={short.id}>
          
//           {/* VIDEO */}
//           <iframe
//             className="short-video"
//             src={`https://www.youtube.com/embed/${short.videoId}?autoplay=1&mute=1&loop=1&playlist=${short.videoId}`}
//             frameBorder="0"
//             allow="autoplay; encrypted-media"
//             allowFullScreen
//           ></iframe>

//           {/* TITLE */}
//           <h4 className="short-title">{short.title}</h4>

//           {/* ACTIONS */}
//           <div className="short-actions">
//             <div className="action">👍 <span>{short.likes}</span></div>
//             <div className="action">👎 <span>Dislike</span></div>
//             <div className="action">💬 <span>{short.comments}</span></div>
//             <div className="action">🔗 <span>Share</span></div>
//             <div className="action">🔁 <span>Remix</span></div>
//           </div>

//         </div>
//       ))}
//     </div>
//   );
// };

// export default Shorts;
import React, { useEffect, useState } from "react";
import "./Shorts.css";

const Shorts = () => {
  const [shorts, setShorts] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("shorts")) || [];
    setShorts(data);
  }, []);

  return (
    <div className="shorts-container">
      {shorts.length === 0 && (
        <h2 style={{ color: "white", textAlign: "center" }}>
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
  );
};

export default Shorts;
