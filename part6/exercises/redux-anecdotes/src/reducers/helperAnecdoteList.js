const anecdotesAtStart = [
    'This is one of my anecdotes',
    'Adding manpower to a late software project makes it later!',
    'What will you do with all of that junk, all of that junk inside your trunk?',
    'Nickelback was one of the best worst bands of all time'
]

const getId = () => Math.floor(Math.random() * 10000)

const anecdotes = (anecdote, index) => {
    return {
      anecdote: anecdote,
      id: index + 1, // Start IDs from 1, or use index if 0-based is fine
      votes: 0
    }
}
  
  const initialState = anecdotesAtStart.map(anecdotes)

  export default initialState