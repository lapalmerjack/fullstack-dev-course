import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'


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
    const changedAnecdote =  {
      ...anecdoteToUpdate, votes: anecdoteToUpdate.votes + 1   
    }
    await anecdoteService.updateVote(id, changedAnecdote)
    dispatch(updateVoteOf(changedAnecdote))
  }
}

export const initializeAnecdotes = () => {
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