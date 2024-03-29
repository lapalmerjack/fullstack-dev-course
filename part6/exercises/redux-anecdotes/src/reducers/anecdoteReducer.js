import { createSlice } from '@reduxjs/toolkit'


const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

// const anecdoteReducer = (state = initialState, action) => {
//   console.log('state now: ', state)
//   console.log('action', action)

//   switch(action.type) {
//     case 'NEW_ANECDOTE':
//     return [...state, action.payload ]
//     case 'UPDATE_VOTE': {
//       const id = action.payload.id
//       const anecdoteToUpdate = state.find(a => a.id === id)
//       const changedAnecdote =  {
//         ...anecdoteToUpdate, votes: anecdoteToUpdate.votes + 1   
//       }
//       return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)
//     }
//     default: return state
//   }

// }

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    createNewAnecdote(state, action) {
      const content = action.payload
      state.push({
        content,
        id: getId(),
        votes: 0  
      })
    },
    updateVoteOf(state, action) {
      const id = action.payload
      const anecdoteToUpdate = state.find(a => a.id === id)
      const changedAnecdote =  {
        ...anecdoteToUpdate, votes: anecdoteToUpdate.votes + 1   
      }
      console.log(JSON.parse(JSON.stringify(state)))

      return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)
    },
    },
  
})

// export const createNewAnecdote = (content) => {
//   return {
//     type: 'NEW_ANECDOTE',
//     payload: {
//       content,
//       id: getId(),
//       votes: 0
//     }
//   }
// }

// export const updateVoteOf = (id) => {
//   return {
//     type: 'UPDATE_VOTE',
//     payload: { id }
//   }
// }
export const { createNewAnecdote, updateVoteOf } = anecdoteSlice.actions
export default anecdoteSlice.reducer