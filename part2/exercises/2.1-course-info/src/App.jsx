import { useState } from 'react'
import Course from './components/Course'

const Header = ({name}) => {
  return (
    <h1>{name}</h1>
  )
}

const Content = ({parts}) => {
  console.log(parts)
  return (
   <div>
     {parts.map(part => <Course key={part.id} name={part.name}
      exercise={part.exercises} /> )}

   </div>
     
  )
}

const SumOfExercises = ({parts}) => {

  const sum = parts.reduce((sum, part) => sum + part.exercises, 0)
  console.log(sum)

  return (
    <p><b>total of {sum} exercises</b></p>
  )

}

const Courses = ({courses}) => {
  console.log(courses)
  return (
    courses.map(course => <CourseSummary key={course.id} course={course} />) 

  )
}


const CourseSummary = ({course}) => {
  return (
   <div>
    <h2>{course.name}</h2>
    <Content parts = {course.parts} />
    <SumOfExercises parts = {course.parts} />
   </div>

  )
}




const App = () => {

  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
  <div>
   <h1>Web Development Curriculum</h1>
   <Courses courses={courses}/>

  </div>)
}

export default App
