import { Response, Request} from "express";
import  { NewPatientEntry, NonSensitivePatientData, Patient } from '../types';
import  patientService  from '../services/patient-service'

import express from 'express';
import { errorMiddleware, newPatientParser } from "../utils/middleware";
const router = express.Router();


router.get('/', (_req, res: Response<NonSensitivePatientData[]>) => {
    res.send(patientService.getNonSensitivePatientEntries());
  });

router.get('/:id',  (req: Request, res: Response<Patient>) => {

    const patient  = patientService.getNonSensitivePatientEntry(req.params.id)
    console.log(patient, 'IS THE PATIENT')
    res.send(patient)
   

})

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<Patient>) => {
    const addedPatientEntry = patientService.addPatient(req.body)
    res.send(addedPatientEntry)
  
} )

router.use(errorMiddleware)

  export default router;


