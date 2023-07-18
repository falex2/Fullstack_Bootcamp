import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

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

  if (totalComments === 0) {
    return <p>No hay estadísticas</p>;
  }

  return (
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="Total comments" value={totalComments} />
          <StatisticLine text="Average score" value={calculateAverageScore()} />
          <StatisticLine text="Positive comments" value={`${calculatePositivePercentage()}%`} />
        </tbody>
      </table>
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
        <Button onClick={() => handleButtonClick('good')} text="Good" />
        <Button onClick={() => handleButtonClick('neutral')} text="Neutral" />
        <Button onClick={() => handleButtonClick('bad')} text="Bad" />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} totalComments={totalComments} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));


