import React, { useEffect, useState } from "react";
import { FiMoreVertical, FiEdit2, FiTrash2 } from "react-icons/fi";
import "./AdminDashbord.css";

export const AdminDashboard = () => {
  const [videos, setVideos] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
  
      const response = await fetch(
        "https://697343e3b5f46f8b5826ae3f.mockapi.io/videos",
        {
          method: "GET",
        }
      );
  
      console.log({ response });
  
      if (!response.ok) {
        throw new Error("Failed to fetch videos");
      }
  
      const data = await response.json();
  
      const reverseData = [...data].reverse(); // latest first
  
      setVideos(reverseData);
      setFilteredVideos(reverseData); // if you want filtering
    } catch (error) {
      console.error("Fetch API Error:", error.message);
      alert("Something went wrong while fetching videos ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deletePostById = async (id) => {
    try {
      const response = await fetch(
        `https://697343e3b5f46f8b5826ae3f.mockapi.io/videos/${id}`,
        { method: "DELETE" }
      );
  
      if (!response.ok) {
        throw new Error("Delete failed");
      }
  
      alert("Video deleted successfully ✅");
      fetchData();
    } catch (error) {
      console.error("Delete Error:", error.message);
      alert("Delete failed ❌");
    }
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
                      onClick={() => deletePostById(video.id)}
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
