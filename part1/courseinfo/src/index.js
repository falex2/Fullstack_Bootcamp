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
  const [selected, setSelected] = useState(0); // State to track the selected anecdote index

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

  // Function to handle the click of the "Next Anecdote" button
  const handleNextAnecdoteClick = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
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
      <div>
        <h2>Anecdote of the Day</h2>
        <div>{anecdotes[selected]}</div>
        <Button onClick={handleNextAnecdoteClick} text="Next Anecdote" />
      </div>
    </div>
  );
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

ReactDOM.render(<App />, document.getElementById('root'));



