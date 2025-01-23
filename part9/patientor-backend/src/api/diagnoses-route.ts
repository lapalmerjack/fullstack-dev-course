import { Response, Request, NextFunction } from "express";
import { Diagnosis,  NewEntry, Patient } from "../types";
import diagosesService from "../services/diagnoses-service";
import { newEntryParser } from "../utils/middleware";
import express from "express";
const router = express.Router();

router.get("/", (_req, res: Response<Diagnosis[]>) => {
  res.send(diagosesService.getDiagnosesEntries());
});

router.get('/:id', (req: Request, res: Response<Diagnosis>) => {
  const diagnosis = diagosesService.getDiagnosesEntry(req.params.code)
  res.send(diagnosis)

})

 

router.post('/:id', newEntryParser, (req: Request<{id: string}, unknown, NewEntry>, res: Response<Patient>, next: NextFunction) => {
  console.log("I AM HERE")

  try {
    const newEntry = diagosesService.addDiagnosisEntry(req.body, req.params.id)!;
    res.send(newEntry!)
  } catch(error: unknown) {
    next(error);
  }

})

export default router;
