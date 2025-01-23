import { NewPatientEntry, Gender, HealthCheckRating } from "../types";
import { z } from "zod";

export const NewPatientEntrySchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string().optional(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
});

export const diagnosisSchema = z.object({
    code: z.string(),
    name: z.string(),
    latin: z.string().optional()
})

// Define BaseEntry Schema
const baseEntrySchema = z.object({
  description: z.string(),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date",
  }),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
});

// Define HealthCheckEntry Schema
const healthCheckEntrySchema = baseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.nativeEnum(HealthCheckRating),
});

// Define SickLeave Schema
const sickLeaveSchema = z.object({
  startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid start date",
  }),
  endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid end date",
  }),
});

// Define OccupationalHealthcareEntry Schema
const occupationalHealthcareEntrySchema = baseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: sickLeaveSchema.optional(),
});

// Define Discharge Schema
const dischargeSchema = z.object({
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid discharge date",
  }),
  criteria: z.string(),
});

// Define HospitalEntry Schema
const hospitalEntrySchema = baseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: dischargeSchema,
});

// Combine the schemas into a union
export const NewEntrySchema = z.union([
  healthCheckEntrySchema,
  occupationalHealthcareEntrySchema,
  hospitalEntrySchema,
]);

export const IdSchema = z.string().uuid().or(z.string().min(1)); 




const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  return NewPatientEntrySchema.parse(object);
};

export default toNewPatientEntry;
