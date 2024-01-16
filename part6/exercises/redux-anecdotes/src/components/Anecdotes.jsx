/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { updateVoteOf } from '../reducers/anecdoteReducer'

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
    const anecdotes = useSelector(state => state)
    const sortByVotes = [...anecdotes].sort((a, b) => b.votes - a.votes)

    return(
        <div>
              {sortByVotes.map(anecdote =>
            <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => 
                dispatch(updateVoteOf(anecdote.id))
            }
            />
            )}
        </div>
       
        
      
    )

}

export default Anecdotes