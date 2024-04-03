
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const numbersMap = new Map();


app.use(bodyParser.json());


app.post('/numbers/:numberId', (req, res) => {
  const { numberId } = req.params;
  const { value } = req.body;

  
  if (!Number.isInteger(+numberId) || +numberId <= 0) {
    return res.status(400).json({ error: 'Invalid number ID. Please provide a positive integer.' });
  }

  if (value === undefined || typeof value !== 'number') {
    return res.status(400).json({ error: 'Invalid value. Please provide a numeric value.' });
  }

  
  numbersMap.set(numberId, value);

  res.json({ success: true });
});


app.get('/average', (req, res) => {
  
  const values = Array.from(numbersMap.values());

  
  const sum = values.reduce((acc, curr) => acc + curr, 0);
  const average = values.length === 0 ? 0 : sum / values.length;

  res.json({ average });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
