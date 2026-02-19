import { useLocation } from "react-router-dom";

const SearchPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q"); 

  return (
    <div>
      {filtered.length > 0 ? (
        filtered.map(v => <VideoCard video={v} />)
      ) : (
        <h2>No results found for "{query}"</h2>
      )}
    </div>
  );
};