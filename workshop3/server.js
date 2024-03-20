const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5003;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/data', (req, res) => {
  res.json({ message: 'data fetched successfully' });
});

app.post('/api/data', (req, res) => {
  const newData = req.body;
  res.status(201).json({ message: 'data posted successfully: : ', data: newData });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
