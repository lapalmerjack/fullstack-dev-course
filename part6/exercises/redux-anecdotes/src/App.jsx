import Anecdotes from './components/Anecdotes'
import NewAnecdote from './components/NewAnecdote'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {



  return (
    <div>
      <Notification />
      <Filter />
     <Anecdotes/>
    <NewAnecdote/>
    </div>
  )
}



export default App