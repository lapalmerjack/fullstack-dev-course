import { useState } from 'react'

const Header = () => {
  return (
    <h1>Give feedback</h1>
  )
}

const Statistics = () => {
  return (
    <h2>Statistics</h2>
  )
}

const StatisticsLine = ({text, stat}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{stat}</td>
    </tr>
 
  
  )

}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Stats = ({good, bad, neutral}) => {
  if(good <= 0 && bad <= 0 && neutral <= 0) {
    return (
    <div>No feedback given</div>
    )
  }
  const clickTotal =   good + bad + neutral
  const average = ((1 * good) + (-1 * bad)) / clickTotal
  const goodPercentage = good <= 0 ? 0 : good / clickTotal * 100

  return (
    
    <div>
      <table>
        <tbody>
      <StatisticsLine text='good' stat={good} />
      <StatisticsLine text='neutral' stat={neutral} />
      <StatisticsLine text='bad' stat={bad} />
      <StatisticsLine text='average' stat={average} />
      <StatisticsLine text='positive' stat={goodPercentage} />
      </tbody>
      </table>
   
    </div>
  )

}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    const newGood = good + 1
    setGood(newGood)
  }
  const handleNeutral = () => {
    const newNeutral = neutral +1
    setNeutral(newNeutral)
  }

  const handleBad = () => {
    const newBad = bad + 1
    setBad(newBad)
  }

  return (
    <div>
      <Header />
      <Button handleClick={handleGood} text='good' />
      <Button handleClick={handleNeutral} text='neutral' />
      <Button handleClick={handleBad} text='bad' />
      <Statistics />
      <Stats good={good} bad={bad} neutral={neutral}/>

      
    </div>
  )
}

export default App