
import './App.css';



const Total = (props) => {

  const sum = props.parts.reduce((summed, a) => summed + a.exercises, 0)

  return (
    <div>
      <p>
     {sum}
      </p>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>
      {props.part}
      </p>
     
    </div>
  )
}


const Header = (props) => {

  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )

}


const Content = (props)  => {
  console.log(props, "here")
  return (

    <div>
     <Part part = {props.parts[0].name}/>
     <Part part = {props.parts[1].name}/>
     <Part part = {props.parts[2].name}/>


    </div>
    
  )

}






  const App = () => {
    const course = {
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10
        },
        {
          name: 'Using props to pass data',
          exercises: 7
        },
        {
          name: 'State of a component',
          exercises: 14
        }
      ]
    }
  
  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App