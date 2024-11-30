import { useSelector } from 'react-redux'
const Notification = () => {
  const notification = useSelector(state => state.notification)
  if(notification === null)  {
    return null
  }
  const pattern = /wrong credentials|removed from server|minimum allowed length/i

  console.log({ notification}, 'is the message')

  if(pattern.test(notification)) {
    return (
      <div className="error">
        {notification}
      </div>
    )
  }
 if(notification !== '') {
  return (
    <div className="notification">

      {notification}
    </div>
  )
 }

  
}

export default Notification

