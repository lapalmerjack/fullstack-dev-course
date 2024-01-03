/* eslint-disable react/prop-types */
const Notification = ({ message }) => {
  console.log(message, ' this is my message')
  if(message === null)  {
    return null
  }
  const pattern = /wrong credentials|removed from server|minimum allowed length/i

  console.log({ message }, 'is the message')

  if(pattern.test(message)) {
    console.log('in here bro')
    return (
      <div className="error">
        {message}
      </div>
    )
  }


  return (
    <div className="message">

      {message}
    </div>
  )
}

export default Notification

