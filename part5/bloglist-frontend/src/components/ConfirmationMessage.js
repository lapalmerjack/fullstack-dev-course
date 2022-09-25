const ConfirmationMessage = ({message}) => {
    console.log(message)

    if (!message) {
      return null
    }
  
    return (
       
      <div className='message'>
        {message}
      </div>
    )
  }

  export default ConfirmationMessage