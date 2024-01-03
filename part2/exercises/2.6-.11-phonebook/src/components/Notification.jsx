/* eslint-disable react/prop-types */
const Notification = ({message}) => {
   
    if(message === null)  {
        return null
    }
    const pattern = /valid number|removed from server|minimum allowed length/i;

    console.log({message}, 'is the message')

    if(pattern.test(message)) {
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

