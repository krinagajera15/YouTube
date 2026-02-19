import React, { useEffect, useState } from "react";
import "./ManageVideos.css";

const ManageVideos = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {

    fetch("https://6462d9b79c677e23218af42b.mockapi.io/videos")
      .then((res) => res.json())
      .then((data) => setVideos(data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    fetch(`https://6462d9b79c677e23218af42b.mockapi.io/videos/${id}`, {
      method: "DELETE",
    })
      .then(() => setVideos(videos.filter((v) => v.id !== id)))
      .catch((err) => console.log(err));
  };

  return (
    <div className="manage-videos">
      <h2>Manage Videos</h2>
      <ul>
        {videos.map((video) => (
          <li key={video.id}>
            {video.title} - {video.channel}
            <button onClick={() => handleDelete(video.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageVideos;
