const express = require('express');
const app = express();
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 5006;

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

app.use(morgan('combined', { stream: accessLogStream }));

app.get('/', (req, res) => {
  console.log(">Yoo!");
  res.send('Backend is running successfully!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

