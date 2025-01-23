import express from 'express';
import { calculateBmi } from './bmiCalculator';
import calculateExercises from './calculateExercises';

const app = express();


app.get('/hello', (_req, res) => {


res.send("Hello World!")
});


app.get('/bmi', (req, res) => {
 
        const height: number = Number(req.query.height)
        const weight: number = Number(req.query.weight)
        if (isNaN(height) || isNaN(weight)) {
            res.status(400).json({ error: "malformatted data" });
            return;
          }
        
        const myResponse = calculateBmi(height, weight)

        res.setHeader('Content-Type', 'application/json');
    
      res.send(JSON.stringify({weight: weight, height: height, bmi: myResponse }));
    

});

app.post('/exercises', (req, res) => {

  const {dailyExercises, target} = req.body;

  if(!dailyExercises || !target) {
    res.status(400).json({ error: "parameters missing" });
    return;
  }

  if ((Array.isArray(dailyExercises) && dailyExercises.every(item => typeof item !== 'number')) || typeof target !== 'number') {
    res.status(400).json({ error: "malformatted data" });
    return;
  }

  const myResponse = calculateExercises(dailyExercises, target)
  res.setHeader('Content-Type', 'application/json');
    
  res.send(JSON.stringify({ myResponse }));

})



const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});