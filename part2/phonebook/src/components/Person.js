const Person = ({person, deletePerson}) => {
    console.log(person)

    return (

        <div>
      {person.name} {person.number}
      <button onClick={deletePerson}>delete</button>
        </div>
       
    )

}

export default Person