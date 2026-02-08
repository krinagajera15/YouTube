import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "./SearchPage.css"; 

const SearchPage = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  
  // URL માંથી query મેળવો (દા.ત. ?query=react)
  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://697343e3b5f46f8b5826ae3f.mockapi.io/videos`);
        const allVideos = await res.json();
        
        // ટાઇટલ કે ચેનલના નામમાં સર્ચ ટર્મ છે કે નહીં તે ચેક કરો
        const filteredVideos = allVideos.filter((video) =>
          video.title.toLowerCase().includes(query.toLowerCase()) ||
          video.channel.toLowerCase().includes(query.toLowerCase())
        );
        
        setResults(filteredVideos);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (query) fetchSearchResults();
  }, [query]);

  if (loading) return <div className="loading-text">Searching...</div>;

  return (
    <div className="search-results-container">
      {results.length > 0 ? (
        results.map((video) => (
          <Link to={`/watch/${video.id}`} key={video.id} className="search-card">
            <div className="search-thumbnail">
              <img src={video.thumbnail} alt={video.title} />
            </div>
            <div className="search-info">
              <h3>{video.title}</h3>
              <p className="search-meta">{video.views} views • {video.channel}</p>
              <p className="search-desc">Experience the best of {video.channel} content here...</p>
            </div>
          </Link>
        ))
      ) : (
        <div className="no-data-found">
          <h2>😕 No results found for "{query}"</h2>
          <p>Try different keywords or check your spelling.</p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;