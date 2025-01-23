import { JSX } from "react";
import { CoursePart } from "../types";



const Part = (course : CoursePart ) => {

    const assertNever = (value: never): never => {
        throw new Error(
          `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
      };
    switch(course.kind) {
        case "basic":
            return (
                <div>{course.description}</div>
            )
        case "background":
            return (
                <div>{course.description}
                <div>{course.backgroundMaterial}</div>
                </div>
            )
    
        case "group":
            return (
                <div> project exercises {course.groupProjectCount}</div>
            )
        case "special":
            return (
                <div>
                    {course.requirements.map((requirement, index) => (
                     <span key={requirement}>
                    {requirement}
                    {index < course.requirements.length - 1 && " "}
                  </span>
                ))}
              </div>
            )
        default:
            return assertNever(course)
    }


}



const Content = ( course: CoursePart): JSX.Element => {
    return (
        <div>
            <div>
       <b>{course.name} {course.exerciseCount}</b> 
        </div>
        <Part {...course}/>
        </div>
    )
}


export default Content