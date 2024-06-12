import React from 'react';
import "./ConclusionBox.css";

function ConclusionBox({ comments }) {
  const positiveComments = comments.filter(comment => comment.sentiment === 'positive');
  const negativeComments = comments.filter(comment => comment.sentiment === 'negative');
  const neutralComments = comments.filter(comment => comment.sentiment === 'neutral');

  const countSentiments = () => {
    let positiveCount = 0;
    let negativeCount = 0;
    let neutralCount = 0;
    comments.forEach(comment => {
        if (comment.sentiment === 'positive') {
          positiveCount++;
        } else if (comment.sentiment === 'negative') {
          negativeCount++;
        } else {
          neutralCount++;
        }
      });

      return { positiveCount, negativeCount, neutralCount };
    };
    const { positiveCount, negativeCount, neutralCount } = countSentiments();

  return (
    <div className="ConclusionBox">
        <div className='outer1'>
      <div className="comment">
        <h3>Positive Comments:</h3>
        <ul>
          {positiveComments.map((comment, index) => (
            <li key={index}>{comment.text}</li>
          ))}
        </ul>
      </div>
      <div className="comment">
        <h3>Negative Comments:</h3>
        <ul>
          {negativeComments.map((comment, index) => (
            <li key={index}>{comment.text}</li>
          ))}
        </ul>
      </div>
      <div className="comment">
        <h3>Neutral Comments:</h3>
        <ul>
          {neutralComments.map((comment, index) => (
            <li key={index}>{comment.text}</li>
          ))}
        </ul>
      </div>
      </div>
      <div className='outer2'>
    <div className="counter">
      <h3>Total Comments: {comments.length}</h3>
    </div>
    <div className="counter">
      <h3>Positive Comments: {positiveCount}</h3>
    </div>
    <div className="counter">
      <h3>Negative Comments: {negativeCount}</h3>
    </div>
    <div className="counter">
      <h3>Neutral Comments: {neutralCount}</h3>
    </div>
    </div>
  </div>
  );
}

export default ConclusionBox;
