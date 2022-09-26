
const ErrorMessage = ({message}) => {
  
    if (message === null) {
      return null
    }
  
    return (
    
      <div className='error'>
        {message} in here
      </div>
    )
  }

  export default ErrorMessage