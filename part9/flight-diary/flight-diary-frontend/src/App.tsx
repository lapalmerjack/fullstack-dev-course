import { useEffect, useState } from 'react'
import Header from './Components/Header'
import { DiaryEntry, NewEntry } from './types'
import { createNewEntry, getAllEntries } from './entryService'
import Entry from './Components/Entry'
import EntryForm from './Components/EntryForm'
import Notification from './Components/Notification'

function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([])
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    getAllEntries().then(data => {
      setEntries(data)
    })
  })

  const addEntry = async (newEntry: NewEntry) => {
    try {
      const diaryEntry = await createNewEntry(newEntry);
      setEntries(entries.concat(diaryEntry));
    } catch (error: unknown) {
      if (error instanceof Error) {
        const index = error.message.indexOf("Error:") 
        const displayMessage = index !== -1 ? error.message.slice(index, error.message.length -1) : message;

        setMessage(
          displayMessage
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)

      } else {
        console.error("An unknown error occurred");
      }
    }
  };
  


  return (
    <div>
      <h2>Add new entry</h2>
      <Notification message={message}/>
     
        <EntryForm addEntry={addEntry} />
          <Header />
          {entries.map(entry => <Entry key={entry.id} {...entry} />)}
    </div>
    

    
  )
}

export default App
