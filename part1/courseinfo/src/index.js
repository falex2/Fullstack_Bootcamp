import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Statistics = ({ good, neutral, bad, totalComments }) => {
  // Calculate the average score
  const calculateAverageScore = () => {
    if (totalComments === 0) return 0;
    return (good - bad) / totalComments;
  };

  // Calculate the percentage of positive comments
  const calculatePositivePercentage = () => {
    if (totalComments === 0) return 0;
    return (good / totalComments) * 100;
  };

  return (
    <div>
      <h2>Statistics</h2>
      <p>Total comments: {totalComments}</p>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>Average score: {calculateAverageScore()}</p>
      <p>Positive comments: {calculatePositivePercentage()}%</p>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // Calculate the total number of comments
  const totalComments = good + neutral + bad;

  // Function to handle the click of each button
  const handleButtonClick = (type) => {
    switch (type) {
      case 'good':
        setGood(good + 1);
        break;
      case 'neutral':
        setNeutral(neutral + 1);
        break;
      case 'bad':
        setBad(bad + 1);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <h1>Feedback App</h1>
      <div>
        <button onClick={() => handleButtonClick('good')}>Good</button>
        <button onClick={() => handleButtonClick('neutral')}>Neutral</button>
        <button onClick={() => handleButtonClick('bad')}>Bad</button>
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} totalComments={totalComments} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
