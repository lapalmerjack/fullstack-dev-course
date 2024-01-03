const Person = ({name, number, deletePerson}) => {
    console.log(name)
    return (
       <div>{name} {number}  <button onClick={deletePerson}>delete</button></div>
       
    )
}

export default Person