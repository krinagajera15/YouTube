import React, { useContext } from "react";
import "./NotificationsModal.css";
import Modecontext from "../Context/ModeContext";

const DEFAULT_CHANNEL_IMG =
  "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png";

const notifications = [
  {
    id: 1,
    title: "BAPS India is live",
    description:
      "Morning Puja Darshan – Atladara Mandir | 2 Feb 2026, 6:15 AM IST",
    time: "4 hours ago",
    videoId: "GCMLDUFXsM8",
    channelImg: "https://i.imgur.com/8Km9tLL.png"
  },
  {
    id: 2,
    title: "BAPS India Evening Sabha",
    description:
      "Mahant Swami Maharaj Evening Sabha – Bochasan | Live",
    time: "Yesterday",
    videoId: "aqz-KE-bpKQ",
    channelImg: "https://i.imgur.com/QCNbOAo.png"
  },
  {
    id: 3,
    title: "Pramukh Swami Highlights",
    description:
      "Pramukh Swami Maharaj Smruti Darshan | Highlights",
    time: "2 days ago",
    videoId: "9bZkp7q19f0",
    channelImg: "https://i.imgur.com/zYxDCQT.png"
  },
  {
    id: 4,
    title: "BAPS Youth Sabha",
    description: "Youth Sabha activities and motivational talk",
    time: "2 days ago",
    videoId: "E7wJTI-1dvQ",
    channelImg: "https://i.imgur.com/8Km9tLL.png"
  },
  {
    id: 5,
    title: "Temple Aarti Live",
    description: "Evening Aarti from Akshardham Temple",
    time: "3 days ago",
    videoId: "l482T0yNkeo",
    channelImg: "https://i.imgur.com/0y0y0y0.png"
  },
  {
    id: 6,
    title: "Special Festival Coverage",
    description: "Live coverage of festival celebrations",
    time: "3 days ago",
    videoId: "M7lc1UVf-VE",
    channelImg: "https://i.imgur.com/3GvwNBf.png"
  },
  {
    id: 7,
    title: "Children Bal Sabha",
    description: "Bal Sabha activities and moral stories",
    time: "4 days ago",
    videoId: "Zi_XLOBDo_Y",
    channelImg: "https://i.imgur.com/7kceK0A.png"
  },
  {
    id: 8,
    title: "Bhajan Sandhya",
    description: "Devotional bhajans sung live by devotees",
    time: "5 days ago",
    videoId: "dQw4w9WgXcQ",
    channelImg: "https://i.imgur.com/zYxDCQT.png"
  },
  {
    id: 9,
    title: "Weekly Satsang Recap",
    description: "Highlights from weekly satsang programs",
    time: "1 week ago",
    videoId: "C0DPdy98e4c",
    channelImg: "https://i.imgur.com/8Km9tLL.png"
  }
];


const NotificationsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const ctx=useContext(Modecontext);
  return (
    <div className="notif-backdrop" onClick={onClose}>
      <div className={`notif-modal ${ctx?.mode}`} onClick={(e) => e.stopPropagation()}>
        <h3>Notifications</h3>

        <ul className="notif-list">
          {notifications.map((n) => (
            <li key={n.id} className="notif-item">
          
              <img
                className="channel-icon"
                src={n.channelImg || DEFAULT_CHANNEL_IMG}
                alt="channel"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = DEFAULT_CHANNEL_IMG;
                }}
              />

          
              <div className="notif-text">
                <p className="titl-noti-class">
                  <strong >{n.title}</strong> {n.description}
                </p>
                <small>{n.time}</small>
              </div>

              
              <img
                className="video-thumb"
                src={`https://i.ytimg.com/vi/${n.videoId}/hqdefault.jpg`}
                alt="video"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NotificationsModal;
