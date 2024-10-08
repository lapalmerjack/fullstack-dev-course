import { useDispatch } from "react-redux";
import { setEmpty, setMessage } from "../reducers/notificationReducer";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const NewAnecdote = () =>  {

    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(anecdote))

      
        const message = `${anecdote} has been added`
        dispatch(setNotification(message, 5))
  
    }

    return (
        <div>
             <h2>create new</h2>
             <form onSubmit={addAnecdote}>
            <input name="anecdote" />
            <button type="submit">create</button>
        </form>
        </div>
      
    )
    
}

export default NewAnecdote