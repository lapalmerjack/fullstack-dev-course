/* eslint-disable no-undef */
import anecdoteReducer from "./anecdoteReducer";
import deepFreeze from 'deep-freeze'
import initialState from "./helperAnecdoteList";
import filterReducer, { filterChange } from "./filterReducer";


describe('anecdoteReducer', () => {
    test('returns appends a new anecdote when using appendAnecdote', () => {
        const state = []
        const action = {
            type: 'anecdotes/appendAnecdote',
            payload: initialState[0]
        }

        deepFreeze(state)
        const newState = anecdoteReducer(state, action)
        
        
        // eslint-disable-next-line no-undef
        expect(newState).toHaveLength(1)
        expect(newState.map(s => s.anecdote)).toContain(action.payload.anecdote)
    })
    test('returns an updoot when the vote button is clicked', () => {
        const state = initialState
        const changedAnecdote = {...state[1], votes: state[1].votes + 1}
  
       
        const action = {
            type: 'anecdotes/updateVoteOf',
            payload: changedAnecdote
        }
        
        deepFreeze(state)
        const newState = anecdoteReducer(state, action)
        expect(newState).toHaveLength(4)
        expect(newState[1].votes).toBe(1)
    })

    test('filters the anecdotes depending on the filter', () => {
        expect(filterReducer(undefined, {})).toBe('')
    })
  
    test('should handle filterChange', () => {
      const action = filterChange('Nickelback')
      const newState = filterReducer('', action)
      
      expect(newState).toBe('Nickelback')
    })

})