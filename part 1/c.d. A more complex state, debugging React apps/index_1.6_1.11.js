import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({text, handlerClick}) => <button onClick={handlerClick}>{text}</button>

const Statistics = ({values}) => {
  console.log(values)
  let good, neutral, bad, weight
  [good, neutral, bad, weight] = values

  let all = good + neutral + bad

  const roundNumber = (number) => Math.round(number  * 100) / 100

  let average = roundNumber(
    (
    weight['good'] * good + 
    weight['neutral'] * neutral + 
    weight['bad'] * bad 
    ) / all)
  let positive = roundNumber(( good / all ) * 100)

  if(all > 0) {
    return (
      <table>
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="all" value={all} />
          <Statistic text="average" value={average} />
          <Statistic text="positive" value={positive + " %"} />
        </tbody>
      </table>
    )
  }
  return (
    <p>No feedback given</p>
  )
}

const Statistic = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const feedbackWeight = {
    good : 1,
    neutral : 0,
    bad : -1
  }

  const handleBtnClick = (feedback) => {
    return () => {
      switch(feedback.toLowerCase()) {
        case "good":
          setGood(good + 1)
          break
        case "neutral":
          setNeutral(neutral + 1)
          break
        case "bad":
          setBad(bad + 1)
          break
        default:
          break
      }
    }
  }

  return (
    <div>

      <h1>give feedback</h1>
      <Button text="good" handlerClick={handleBtnClick("good")} />
      <Button text="neutral" handlerClick={handleBtnClick("neutral")} />
      <Button text="bad" handlerClick={handleBtnClick("bad")} />

      <h1>statistics</h1>
      <Statistics values={[good, neutral, bad, feedbackWeight]} />

    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)