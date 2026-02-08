import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateChannelModal.css";
import Modecontext from "../Context/ModeContext";

const CreateChannelModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null); // base64 string
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const ctx = useContext(Modecontext);

  if (!isOpen) return null;

  // Convert image to base64 with size check
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Size limit: 50KB કke 100KB
    if (file.size > 100 * 1024) {
      alert("Image size must be less than 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      alert("Channel name is required");
      return;
    }
    if (!image) {
      alert("Channel image is required");
      return;
    }

    const newChannel = { c_name: name.trim(), c_image: image };

    setLoading(true);
    try {
      console.log("📤 Sending to API:", newChannel); // Debug: Check data
      const res = await fetch(
        "https://69809eaa6570ee87d50fd891.mockapi.io/channelsdata",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newChannel),
        }
      );

      console.log("📊 Response status:", res.status); // Debug: Status code

      if (!res.ok) {
        const errorText = await res.text();
        console.error("❌ API Error response:", errorText);
        throw new Error(`API Error ${res.status}: ${errorText}`);
      }

      const data = await res.json();
      // --- Success Message અહીં આવશે ---
      alert("✅ Success: Channel created successfully!");

      // Reset form
      setName("");
      setImage(null);
      onClose();

      // Redirect
      navigate("/admin/add-video", { state: { channel: data } });
    } catch (err) {
      console.error("💥 Full error:", err);
      alert(`Failed to create channel: ${err.message}\n\nCheck console for details.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-channel-overlay" onClick={onClose}>
      <div
        className={`create-channel-modal ${ctx?.mode}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="chenl-title-class">Create Channel</h2>

        <div className="image-upload">
          <div className="image-preview">
            {image ? (
              <img src={image} alt="Channel preview" />
            ) : (
              <div className="placeholder">Select picture</div>
            )}
          </div>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange} 
            disabled={loading}
          />
        </div>

        <input
          type="text"
          placeholder="Channel Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
        />

        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Creating..." : "Create Channel"}
        </button>
        <button className="cancel-btn" onClick={onClose} disabled={loading}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CreateChannelModal;
