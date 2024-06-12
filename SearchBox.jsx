import React, { useState } from 'react';
import "./SearchBox.css";

function SearchBox({ onSearch }) {
  const [videoUrl, setVideoUrl] = useState("");

  const handleInputChange = (e) => {
    setVideoUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const videoId = getYouTubeVideoId(videoUrl);
    if (videoId) {
      onSearch(videoId);
    } else {
      alert('Please enter a valid YouTube video URL.');
    }
    setVideoUrl("");
  };

  const getYouTubeVideoId = (url) => {
    const regex = /(?:youtu\.be\/|\/embed\/|\/watch\?v=|\/v\/|\/watch\?vi=|\/shorts\/|v=)([^&?/]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
    
  };
  

  return (
    <div className='SearchBox'>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Enter the YouTube video URL"
          type="text"
          value={videoUrl}
          onChange={handleInputChange}
        />
        <button id='btn' type="submit">Search</button>
      </form>
    </div>
  );
}

export default SearchBox;
