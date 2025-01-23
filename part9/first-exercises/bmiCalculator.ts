import { parseBmiArguments } from "./utils/helperFunctions";

export const calculateBmi = (height: number, weight: number): string => {
  const heightInMeters = height / 100;

  const BMI: number = weight / heightInMeters ** 2;
  let result: string;
  console.log(BMI);

  // Use switch statement to directly assign the category based on BMI
  switch (true) {
    case BMI < 18.5:
      result = "Underweight";
      break;
    case BMI >= 18.5 && BMI < 24.9:
      result = "Normal weight";
      break;
    case BMI >= 25 && BMI < 29.9:
      result = "Overweight";
      break;
    case BMI >= 30:
      result = "Obesity";
      break;
    default:
      result = "Invalid BMI";
  }

  return result;
};
try {
  const { height, weight } = parseBmiArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
