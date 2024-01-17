/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { updateVoteOf } from '../reducers/anecdoteReducer'

import { setEmpty, setMessage } from "../reducers/notificationReducer";


const Anecdote = ({ anecdote, handleClick }) => {
    return (
        
               
       <div>
         {anecdote.content}
            <div>has {anecdote.votes}
            <button onClick={handleClick}>Vote</button> </div>
       </div>
    )
}

const Anecdotes = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => {
        if (state.filter === '') {
            return state.anecdotes
        }
        return state.filter !== ''
        ? state.anecdotes.filter(a => a.content.toLowerCase()
        .includes(state.filter.toLowerCase()))
        : state.anecdotes
    })
    const sortByVotes = [...anecdotes].sort((a, b) => b.votes - a.votes)

    const handleClick = anecdote => {
        dispatch(updateVoteOf(anecdote.id))

        dispatch(setMessage(`You voted for "${anecdote.content}`))

        setTimeout(() =>  dispatch(setEmpty()), 5000)
    }

    
    

    return(
        <div>
              {sortByVotes.map(anecdote =>
            <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => 
                dispatch(handleClick(anecdote))   
            }
            />
            )}
        </div>
       
        
      
    )

}

export default Anecdotes