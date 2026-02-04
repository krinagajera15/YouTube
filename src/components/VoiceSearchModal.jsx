import React, { useContext } from "react";
import "./VoiceSearchModal.css";
import { MdMic } from "react-icons/md";
import Modecontext from "../Context/ModeContext";

const VoiceSearchModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const ctx=useContext(Modecontext);

  return (
    <div className="voice-backdrop">
      <div className={`voice-modal ${ctx?.mode}`}>
        <button className="close-btn" onClick={onClose}>✕</button>

        <h2 className="modal-title">Search with your voice</h2>
        <p>
          To search by voice, go to your browser settings and allow access to
          microphone
        </p>

        <div className="mic-circle">
          <MdMic />
        </div>
      </div>
    </div>
  );
};

export default VoiceSearchModal;
