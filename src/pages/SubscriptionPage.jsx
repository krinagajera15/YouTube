import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Subscription.css";

export const Subscriptionpage = () => {
  const navigate = useNavigate();
  const [subscribedChannels, setSubscribedChannels] = useState([]);
  const loginData = JSON.parse(localStorage.getItem("loginData"));

  useEffect(() => {
    // LocalStorage માંથી સબ્સ્ક્રાઇબ કરેલી ચેનલો મેળવો
    const savedSubs = JSON.parse(localStorage.getItem("subscribedChannels")) || [];
    setSubscribedChannels(savedSubs);
  }, []);

  const handleSignIn = () => {
    navigate("/login");
  };

  return (
    <>
      {!loginData ? (
        <div className="main-subscript-class">
          <h1 className="main-subscript-description-class">Subscription Page Not Found</h1>
          <h1 className="subscript-detail-class">Please Sign In</h1>
          <button className="btn-signin-class" onClick={handleSignIn}>Sign In</button>
        </div>
      ) : (
        <div className="subscription-list">
          <h2>Your Subscriptions</h2>
          
          {subscribedChannels.length > 0 ? (
            <table className="subscription-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Channel Name</th>
                </tr>
              </thead>
              <tbody>
                {subscribedChannels.map((item, index) => (
                  <tr key={item.id}>
                    <td>
                        <img src={item.channelImage} alt="logo" style={{width:'40px', borderRadius:'50%'}} />
                    </td>
                    <td>{item.channel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{marginTop: '20px'}}>You haven't subscribed to any channels yet.</p>
          )}
        </div>
      )}
    </>
  );
};