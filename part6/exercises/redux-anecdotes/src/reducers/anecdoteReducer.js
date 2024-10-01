import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'


const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdotes = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(anecdotes)

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
  initialState: [],
  reducers: {
    updateVoteOf(state, action) {
      const changedAnecdote = action.payload
   
  
      return state.map(anecdote => anecdote.id !== changedAnecdote.id ? anecdote : changedAnecdote)
    },

    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    

     setAnecdotes(state, action) {
      return action.payload
     }

    },
  
})

export const { updateVoteOf, setAnecdotes, appendAnecdote } = anecdoteSlice.actions

export const updateVote = id => {
  return async (dispatch, getState) => {

    const anecdoteToUpdate = getState().anecdotes.find(a => a.id === id)
    console.log(anecdoteToUpdate, ' is the anecdote to update')
    const changedAnecdote =  {
      ...anecdoteToUpdate, votes: anecdoteToUpdate.votes + 1   
    }
    await anecdoteService.updateVote(id, changedAnecdote)
    dispatch(updateVoteOf(changedAnecdote))
  }
}

export const initializeAnecdotes = anecdote => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = anecdote => {
  console.log('in the createAnecdote')
  return async dispatch => {

    const newAnecdote = await anecdoteService.createNew(anecdote)
    console.log('Reduce creating anecdote:' , newAnecdote)
    dispatch(appendAnecdote(newAnecdote))

  }
}
export default anecdoteSlice.reducer