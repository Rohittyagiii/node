const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.get('/about', (req, res) => {
  res.send(`Hello ${req.query.name}`);
});

app.listen(8000, () => {
  console.log('Server Started');
});
