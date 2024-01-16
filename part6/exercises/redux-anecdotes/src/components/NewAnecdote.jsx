import { useDispatch } from "react-redux";
import { createNewAnecdote  } from "../reducers/anecdoteReducer";

const NewAnecdote = () =>  {

    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''

        dispatch(createNewAnecdote(content))
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