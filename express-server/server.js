// Set up a web server using express
const express = require('express');
const serveIndex = require('serve-index');

const app = express();
const port = 8000;
const host = 'localhost';

app.use((req, res, next) => {
// Middleware to display time of request on console
  console.log('Time: ', Date.now());
  next();
});

app.use('/request-type', (req, res, next) => {
// Middle to display request type on console.
  console.log('Request type: ', req.method);
  next();
});

// Serve static files
app.use('/public', express.static('public'));
// Display an index listing of our files
app.use('/public', serveIndex('public'));

app.get('/', (req, res) => {
	res.send('Successful response');
});


app.listen(port, () => console.log(`App is listening on port http://${host}:${port}.`));
