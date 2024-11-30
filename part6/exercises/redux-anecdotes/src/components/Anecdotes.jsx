/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { updateVote } from '../reducers/anecdoteReducer'


import { setNotification } from "../reducers/notificationReducer";


const Anecdote = ({ anecdote, handleClick }) => {
    return (
        
               
       <div>
         {anecdote.anecdote}
            <div>has {anecdote.votes}
            <button onClick={handleClick}>Vote</button> </div>
       </div>
    )
}

const Anecdotes = () => {
    const dispatch = useDispatch()

    const anecdotes = useSelector(state => {
        console.log(state.filter, 'is my current filter')
        if (state.filter === '') {
            console.log('Nothing to vilter')
            return state.anecdotes
        }
        console.log('FILTERING')
        return state.filter !== ''
        ? state.anecdotes.filter(a => a.anecdote.toLowerCase()
        .includes(state.filter.toLowerCase()))
        : state.anecdotes
    })

    const sortByVotes = [...anecdotes].sort((a, b) => b.votes - a.votes)

    const handleClick = anecdote => {
        dispatch(updateVote(anecdote.id))

        const message = `You voted for "${anecdote.anecdote}`
        dispatch(setNotification(message, 5))

    
    }
    return(
        <div>
              {sortByVotes.map(anecdote =>
            <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => 
               handleClick(anecdote)
            }
            />
            )}
        </div>
       
        
      
    )

}

export default Anecdotes