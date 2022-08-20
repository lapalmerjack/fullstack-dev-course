import { useState } from 'react';



const Button =({handleClick, text}) => {

  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
 
}

const Statistics =({text, clicks, counter}) => {


  if(counter === 0) {

    return (
      <div>
        No feedback given
      </div>
    )
  }

  const positive = (clicks.good/counter) * 100
  const negative = -1 * (clicks.bad)

  const average = (clicks.good + negative) / counter
  

  return (

    <div>
<table>
      <tbody>
        <tr>
          <td>good</td>
          <td>{clicks.good}</td>
        </tr>
        <tr>
          <td>bad</td>
          <td>{clicks.bad}</td>
        </tr>
        <tr>
          <td>neutral</td>
          <td>{clicks.neutral}</td>
        </tr>
        <tr>
          <td>all</td>
          <td>{counter}</td>
        </tr>
        <tr>
          <td>average</td>
          <td>{average}</td>
        </tr>
        <tr>
          <td>positive</td>
          <td>{positive}%</td>
        </tr>
        </tbody>
      </table> 
    </div>

    

  )
}







const App = () => {
  const [counter, setCounter] = useState(0)
  const [clicks, setClicks] = useState({
    good: 0, bad: 0, neutral: 0
  })

  const handleGoodClick = () => {
    setClicks({...clicks, good: clicks.good + 1})
    setCounter(counter + 1)
    
  }

  const handleBadClick = () => {
    setClicks({...clicks, bad: clicks.bad + 1})
    setCounter(counter + 1)
  }

  const handleNeutralClick = () => {
    setClicks({...clicks, neutral: clicks.neutral + 1})
    setCounter(counter + 1)
  }

  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={handleGoodClick} text='good'/>
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <br></br>
      <h2>statistics</h2>
      <Statistics clicks={clicks} counter={counter} />
     



    </div>
  )

}

export default App;
