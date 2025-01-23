import { parseTrainingDayArguments } from "./utils/helperFunctions";

interface Training {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  trainingRecord: number[],
  target: number
): Training => {
  const periodLength = trainingRecord.length;
  const trainingDays = trainingRecord.filter((day) => day > 0).length;
  const average =
    trainingRecord.reduce((acc, current) => acc + current, 0) /
    trainingRecord.length;
  const success: boolean = average >= target;
  const ratingDescription = "Close by no cigar";
  const rating = 1;

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

const trainingRecord = [3, 0, 2, 4, 5, 0, 3];
const target = 3;

const result = calculateExercises(trainingRecord, target);
console.log(result);

try {
  const { days } = parseTrainingDayArguments(process.argv);
  console.log(calculateExercises(days, 2));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}

export default calculateExercises;
