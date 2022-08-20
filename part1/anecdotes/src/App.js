import { useState } from "react";


const RandomQuote = () => {

  const number = max => {
    return Math.floor(Math.random() * max);
  } 

}

const Button =({handleClick, text}) => {

  return (
    <button onClick={handleClick}>
      {text}
    
    </button>
  )
 
}

const MostVotes =({votes, anecdotes}) => {
  const maxVote = Math.max.apply(null, votes)
  const index = votes.indexOf(maxVote)



  return (

    <p>{anecdotes[index]}</p>

  )




}



const App = () => {

  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
 

 

  const handleAnecdoteClick = () => {
    const getRandom = Math.floor(Math.random() * anecdotes.length)

    
    
   
  
    
    console.log(getRandom)
    console.log(anecdotes[getRandom])
    setSelected(getRandom)
     
  }

  const handleVoteclick = () => {

    const copy = [...votes]
    copy[selected] +=1

    setVotes(copy)



  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button handleClick={handleVoteclick} text='votes' />
      <Button handleClick={handleAnecdoteClick} text={'next anecdote'}/>
      <br></br>
      <h1>Anecdote with most votes</h1>
      <MostVotes votes={votes} anecdotes={anecdotes}/>

      
    </div>
  )



}

export default App;
