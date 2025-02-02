import express from 'express';
import { errorHandler } from './utils/middleware';
const app = express();

import cors from 'cors'

import diagnosesRouter from './api/diagnoses-route'
import patientRouter from './api/patient-route'

app.use(cors())

app.use(express.json());



const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter)
app.use('/api/patients', patientRouter)

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

