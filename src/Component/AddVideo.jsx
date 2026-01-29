import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./AddVideo.css";

export const AddVideo = () => {
    
  const [formData, setFormData] = useState({
    title: "",
    channel: "",
    thumbnail: "",
    url: ""
  });

  const [errors, setError] = useState({});

    const getYouTubeID = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

   const handelChange = (feild, value) => {//feild = je feilad nu name aapu hoy te
        setError((e) => ({ ...e, [feild]: "" })); //error msge ne remove karva ate,'...e'=spread opretor
        if (feild === "url") {
            const videoId = getYouTubeID(value);

            if (videoId) {
            setFormData({
                ...formData,
                url: `https://www.youtube.com/embed/${videoId}`,
                thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
            });
            } else {
            setFormData({
                ...formData,
                url: value,
            });
            console.log(formData);
            }
        return;
        }
   }
   

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newError = {};
        if (!formData.title.trim()) newError.title = "Tital Requird.....";
        if (!formData.channel.trim()) newError.channel = "channel Requird.....";
        if (!formData.url.trim()) newError.url = " url Requird.....";
        // if (!formData.body.trim()) newError.body = "Body Requird.....";

        setError(newError);
        if (Object.keys(newError).length > 0) return;
        try{
                    const reasponse=await fetch("https://697343e3b5f46f8b5826ae3f.mockapi.io/videos",{
                        method:"POST",
                        headers:{
                            "Content-type":"application/json",
                        },
                        body: JSON.stringify(formData),
                    });
                    console.log({reasponse});
                    if(!reasponse.ok)
                    {
                        alert("something went wrong!!!");
                    }
                    const data=await reasponse.json();
                    console.log(data);
                    alert("Successfully")
                    setFormData({ title: "", channel: "", thumbnail: "", url: "" });
                    setTimeout(()=>{
                        naviget("/");
                    } ,2000);
                }catch{
                    console.error("Error...🤦‍♀️")
                }
        }

  return (
    <div className="add-video-container">
      <div className="add-video-card">
        <h2>Add New YouTube Video</h2>
        <form className="add-video-form" onSubmit={handleSubmit}>
          
          <div className="input-group">
            <label>Video Title</label>
            <input 
                name="title" 
                placeholder="Enter video title" 
                value={formData.title} 
                onChange={(e) => handelChange("title", e.target.value)}
            />
            {errors.title && <p className="error-class">{errors.title}</p>}
          </div>
          
          <div className="input-group">
            <label>Channel Name</label>
            <input 
                name="channel" 
                placeholder="Enter channel name" 
                value={formData.channel} 
                onChange={(e) => handelChange("channel", e.target.value)}
            />
            {errors.channel && <p className="error-class">{errors.channel}</p>}
          </div>

            <div className="input-group">
                <label>YouTube URL</label>
                <input 
                    name="url" 
                    placeholder="Paste YouTube link here" 
                    value={formData.url} 
                    onChange={(e) => handelChange("url", e.target.value)}
                />
                {errors.url && <p className="error-class">{errors.url}</p>}
            </div>
            {formData.thumbnail && (
                <div className="thumbnail-preview">
                    <p>Thumbnail Preview:</p>
                    <img src={formData.thumbnail} alt="Preview" />
                </div>
            )}

          <button type="submit" className="upload-btn">
            UPLOAD VIDEO
          </button>
        </form>
      </div>
    </div>
  );
};
