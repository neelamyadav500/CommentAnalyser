import React, { useState } from 'react';
import ConclusionBox from "./ConclusionBox";
import SearchBox from "./SearchBox";

const API_KEY = 'YOUR_ACTUAL_API_KEY'; // put you API key here

function CommentAnalyzer() {
  const [comments, setComments] = useState([]);

  const handleSearch = async (videoId) => {
    if (!videoId) {
      alert('Invalid YouTube video ID.');
      return;
    }
    try {
      const fetchedComments = await fetchComments(videoId);
      const categorizedComments = categorizeComments(fetchedComments);
      setComments(categorizedComments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const fetchComments = async (videoId) => {
    let allComments = [];
  
    let nextPageToken = '';
  
    do {
      const response = await fetch(`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${API_KEY}&maxResults=100&pageToken=${nextPageToken}`);
      const data = await response.json();
  
      if (data.items) {
        const comments = data.items.map(item => ({
          text: item.snippet.topLevelComment.snippet.textDisplay,
          sentiment: getSentiment(item.snippet.topLevelComment.snippet.textDisplay)
        }));
        
        allComments = allComments.concat(comments);
      }
  
      nextPageToken = data.nextPageToken; 
    } while (nextPageToken);
  
    return allComments;
  };
  
  const getSentiment = (text) => {
    const positiveWords = ['great', 'awesome', 'good', 'nice', 'excellent', 'love', 'amazing'];
    const negativeWords = ['bad', 'terrible', 'awful', 'worst', 'hate', 'dislike'];
  
    const lowerCaseText = text.toLowerCase();
    
    const isPositive = positiveWords.some(word => lowerCaseText.includes(word));
    const isNegative = negativeWords.some(word => lowerCaseText.includes(word));
  
    if (isPositive && !isNegative) {
      return 'positive';
    } else if (isNegative && !isPositive) {
      return 'negative';
    } else {
      return 'neutral';
    }
  };
  

  const categorizeComments = (comments) => {
    return comments.map(comment => ({
      text: comment.text,
      sentiment: getSentiment(comment.text)
    }));
  };

  return (
    <div>
      <h1>YouTube Comments Analyzer</h1>
      <SearchBox onSearch={handleSearch} />
      <ConclusionBox comments={comments} />
    </div>
  );
}

export default CommentAnalyzer;
