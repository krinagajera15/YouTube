import React, { useEffect, useState, useRef, useContext } from "react";
import { HiMenu } from "react-icons/hi";
import { AiOutlineSearch } from "react-icons/ai";
import { MdMic, MdVideoCall, MdNotifications } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import imgs from '../assets/image/youtube.png'
import Modecontext from "../Context/ModeContext";
import VoiceSearchModal from "./VoiceSearchModal";
import CreateChannelModal from "./CreateChannelModal"; 
import NotificationsModal from "./NotificationsModal";

const Navbar = ({ toggleSidebar }) => {
  const [userInitial, setUserInitial] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [voiceOpen, setVoiceOpen] = useState(false);
  const [videoDropdownOpen, setVideoDropdownOpen] = useState(false);
  const [createChannelOpen, setCreateChannelOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // સર્ચ માટેની સ્ટેટ
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  const videoRef = useRef(null);
  const dropdownRef = useRef(null);

  const { mode, toggleMode } = useContext(Modecontext);

  useEffect(() => {
    const loginData = JSON.parse(localStorage.getItem("loginData"));
    if (loginData) {
      const firstLetter = loginData.username
        ? loginData.username.charAt(0).toUpperCase()
        : loginData.email
        ? loginData.email.charAt(0).toUpperCase()
        : "U";
        setUserInitial(firstLetter);
        setIsLoggedIn(true);
    } else {
      setUserInitial("U");
      setIsLoggedIn(false);
    }
  }, []);

  // સર્ચ હેન્ડલર
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // સર્ચ ટર્મ સાથે સર્ચ પેજ પર મોકલો
      navigate(`/search?query=${searchTerm}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loginData");
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-left">
          <HiMenu className="nav-icon" onClick={toggleSidebar} />
          <img src={imgs} alt="YouTube Logo" className="yt-logo" onClick={() => navigate("/")} style={{cursor:'pointer'}} />
          <h1 className="yt-logo-title" onClick={() => navigate("/")} style={{cursor:'pointer'}}>YouTube</h1>
          <span className="country-code">IN</span>
        </div>

        <div className="nav-center">
          <form className="search-box" onSubmit={handleSearch}>
            <input 
              type="text" 
              placeholder="Search" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="search-btn"><AiOutlineSearch /></button>
          </form>
          <div className="mic-icon" onClick={() => setVoiceOpen(true)}>
            <MdMic />
          </div>
        </div>

        <div className="nav-right">
          <div className="create-video" ref={videoRef}>
            <MdVideoCall
              className="nav-icon"
              onClick={() => setVideoDropdownOpen(!videoDropdownOpen)}
            />
            {videoDropdownOpen && (
              <div className="video-dropdown">
                <button onClick={() => setCreateChannelOpen(true)}>Upload video</button>
                <button onClick={() => alert("Go live clicked")}>Go live</button>
              </div>
            )}
          </div>

          <MdNotifications
            className="nav-icon"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
          />

          <div className="user-profile-container" ref={dropdownRef} style={{position: 'relative'}}>
            <div className="user-profile" onClick={() => setDropdownOpen(!dropdownOpen)}>
              {userInitial || "U"}
            </div>

            {dropdownOpen && (
              <div className="profile-dropdown">
                {isLoggedIn ? (
                  <button onClick={handleLogout}>Logout</button>
                ) : (
                  <button onClick={() => navigate("/login")}>Login</button>
                )}
                <button onClick={toggleMode}>
                  {mode === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <VoiceSearchModal isOpen={voiceOpen} onClose={() => setVoiceOpen(false)} />
      <CreateChannelModal isOpen={createChannelOpen} onClose={() => setCreateChannelOpen(false)} onCreate={(channel) => console.log(channel)} />
      <NotificationsModal isOpen={notificationsOpen} onClose={() => setNotificationsOpen(false)} />
    </>
  );
};

export default Navbar;