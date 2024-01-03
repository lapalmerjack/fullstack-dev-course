import { useState } from 'react'


const Button = ({handleClick, text}) => {
 return (
  <button onClick={handleClick}>
  {text}
</button>
 )
}

const MostVotes = ({anecdotes}) => {
  
  console.log(anecdotes)
  
  const MaxAnecdote = anecdotes.reduce((p, c) =>  p.votes > c.votes ? p : c
  )
  console.log(MaxAnecdote)

  return (
    <div>
      <h2>Anecdote with most votes</h2>
    <div> {MaxAnecdote.anecdote}</div>
    </div>
    
  )
}

const App = () => {

   
  const [selected, setSelected] = useState(0)
  const [anecdotes, setAnecdotes] = useState([
    { "anecdote": 'If it hurts, do it more often.',
      "votes": 0},
      { "anecdote": 'Adding manpower to a late software project makes it later!',
      "votes": 0},
      { "anecdote":     'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
      "votes": 0},
      { "anecdote":     'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
      "votes": 0},
      { "anecdote": 'Premature optimization is the root of all evil.',
      "votes": 0},
      { "anecdote":     'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
      "votes": 0},
      { "anecdote":     'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
      "votes": 0},
      { "anecdote": 'The only way to go fast, is to go well.',
      "votes": 0}
  ])

  


  const setAnecdote = () => {
    const getRandom = Math.floor(Math.random() * anecdotes.length)
    setSelected(getRandom)
  }

  const addVote = () => {
    console.log(anecdotes[selected])
    const newState = [...anecdotes]
    newState[selected].votes = newState[selected].votes + 1
    setAnecdotes(newState)
    

  }

  return (
    <div>
       <div>{anecdotes[selected].anecdote}</div>
       <div>has {anecdotes[selected].votes} votes</div>
      <Button handleClick={setAnecdote} text='next anecdote'/>
      <Button handleClick={addVote} text='vote' />
      <MostVotes anecdotes={anecdotes} />
    </div>
  )
}

export default App