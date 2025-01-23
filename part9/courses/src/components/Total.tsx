

interface CoursePart {
    name: string;
    exerciseCount: number;
  }
  
  interface TotalProps {
    courses: CoursePart[]; // Expect an array of CoursePart objects
  }

const Total = ( {courses}: TotalProps   ) => {
    const totalExercises = courses.reduce((sum, part) => sum + part.exerciseCount, 0);

    return (
        <div>
            Number of exercises {totalExercises}
        </div>
    )
}

export default Total