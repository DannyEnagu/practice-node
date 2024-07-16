const express = require('express');
const routes = require('./routes/api');
const dbConnect = require('./db');

require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

// Connect to MongoDB Database
dbConnect().catch(console.dir);

// Handle CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

//Parse http request data to JSON data
app.use(express.json());

app.use('/api', routes);

app.use((err, req, res, next) => {
  console.log(err);
  next();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
