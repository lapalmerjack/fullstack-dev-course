interface BMI {
    height: number;
    weight: number;
  }

interface TrainingDays {
  days: number[]
}
  

export const parseBmiArguments = (args: string[]): BMI => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
  
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        height: Number(args[2]),
        weight: Number(args[3])
      }
    } else {
      throw new Error('Provided values were not numbers!');
    }
  }

  export const parseTrainingDayArguments = (args: string[]): TrainingDays =>  {
    if (args.length < 4) throw new Error('Not enough arguments');

    const myDays = args.slice(2)

    const trainingDays: TrainingDays = { days: [] }

    myDays.forEach((number) => {
      if(!isNaN(Number(number))) {
        trainingDays.days.push(Number(number))
      }
    })
    console.log(myDays, " ARE THE DAYS BRO")

    return trainingDays

  }

 