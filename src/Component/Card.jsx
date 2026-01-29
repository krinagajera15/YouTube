import "./Card.css";

export const VideoCard = ({ video, isAdmin, onEdit, onDelete }) => {
  return (
    <div className="video-card">
      {/* Thumbnail */}
      <div className="thumbnail-wrapper">
        <img src={video.thumbnail} alt={video.title} />
        <span className="duration">12:45</span>

        {isAdmin && (
          <div className="admin-overlay">
            {/* <button onClick={onEdit}>Edit</button>
            <button onClick={onDelete}>Delete</button> */}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="video-info">
        <h3 className="video-title">{video.title}</h3>
        <p className="video-channel">{video.channel}</p>
      </div>
    </div>
  );
};
