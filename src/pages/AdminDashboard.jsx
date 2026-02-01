import React, { useEffect, useState } from "react";
import { FiMoreVertical, FiEdit2, FiTrash2 } from "react-icons/fi";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [videos, setVideos] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);

  useEffect(() => {
    fetch("https://697343e3b5f46f8b5826ae3f.mockapi.io/videos")
      .then((res) => res.json())
      .then((data) => setVideos(data));
  }, []);

  const handleDelete = (id) => {
    fetch(`https://697343e3b5f46f8b5826ae3f.mockapi.io/videos/${id}`, {
      method: "DELETE",
    }).then(() => {
      setVideos(videos.filter((v) => v.id !== id));
    });
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <p>Here admin can see all videos, edit or delete them.</p>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Channel</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {videos.map((video) => (
            <tr key={video.id}>
              <td>
                <img src={video.thumbnail} alt="" width="120" />
              </td>
              <td>{video.title}</td>
              <td>{video.channel}</td>
              <td className="action-cell">
                <FiMoreVertical
                  className="menu-icon"
                  onClick={() =>
                    setOpenMenuId(openMenuId === video.id ? null : video.id)
                  }
                />

                {openMenuId === video.id && (
                  <div className="action-menu">
                    <div className="action-item">
                      <FiEdit2 /> Edit
                    </div>
                    <div
                      className="action-item delete"
                      onClick={() => handleDelete(video.id)}
                    >
                      <FiTrash2 /> Delete
                    </div>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
