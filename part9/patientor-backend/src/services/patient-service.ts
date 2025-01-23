import { NonSensitivePatientData, NewPatientEntry, Patient } from '../types'
import { v1 as uuid } from 'uuid'

import patientEntries from '../data/patients'


const addPatient = (newPatient: NewPatientEntry): NonSensitivePatientData => {
    const newPatientEntry: Patient  = {
        id: uuid(),
        ...newPatient,
        entries: []
    }
patientEntries.concat(newPatientEntry)
return newPatientEntry

}


const getNonSensitivePatientEntries = (): NonSensitivePatientData[] => {
    return patientEntries.map(({ id, name, dateOfBirth, gender, occupation, entries}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};

const getNonSensitivePatientEntry = (id: string): Patient | undefined => {
    console.log('THE STRING', id)
    console.log(patientEntries.map(patient => patient.id))
    const patient = patientEntries.find(patient => patient.id === id)
    console.log("THE PATIENT", patient)
    return patient
}

export default {
    getNonSensitivePatientEntries,
    addPatient,
    getNonSensitivePatientEntry
}