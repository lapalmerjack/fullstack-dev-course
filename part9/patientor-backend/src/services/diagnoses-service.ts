import { Diagnosis, Entry, NewEntry, Patient } from "../types";
import { difference } from "lodash";
import { NotFoundError } from "../utils/errors";
import { v1 as uuid } from "uuid";

import diagnosesEntries from "../data/diagnoses";
import patientEntries from "../data/patients";

const getDiagnosesEntries = (): Diagnosis[] => {
  return diagnosesEntries;
};

const getDiagnosesEntry = (code: string): Diagnosis => {
    return diagnosesEntries.find(d => d.code === code )!
}

const addDiagnosisEntry = (newEntry: NewEntry, patientId : string) => {
  const codes = diagnosesEntries.map(d => d.code);
   const isDifferenceOfCodes = newEntry.diagnosisCodes != null ? difference(newEntry.diagnosisCodes, codes) : []
  if(isDifferenceOfCodes?.length > 0) {
    throw new NotFoundError(`Code(s) do not exist: ${isDifferenceOfCodes.join(", ")}`);
  }
  const entryWithId: Entry = {
    id: uuid(),
    ...newEntry
  }

  const patientForEntry = patientEntries.find(patient => patient.id === patientId)
  const updatedPatient: Patient = {
    ...patientForEntry!,
    entries: [...(patientForEntry!.entries || []), entryWithId]
  };
     
    const patientIndex = patientEntries.findIndex(patient => patient.id === updatedPatient.id);
    patientEntries[patientIndex] = { ...patientEntries[patientIndex], ...updatedPatient };


   
  
    const patientForEntryCheck = patientEntries.find(patient => patient.id === patientId)
    console.log(patientForEntryCheck?.entries.length)

   
  return updatedPatient
  
}

export default {
  getDiagnosesEntries,
  getDiagnosesEntry,
  addDiagnosisEntry
};
