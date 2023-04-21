'user strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();
const { getWeatherData } = require('./modules/weather')
const { getMovieData } = require('./modules/movies')

app.use(cors());

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => console.log(`We good and on port ${PORT}`));

app.get('/', (req, res) => {
  res.status(200).send('Welcome to our server'); // where we want the request
});

app.get('/weather', (req, res, next) => {
  try {
    getWeatherData(req, res);

  } catch (error) {
    next(error);
  }
});

app.get('/movies', (req, res, next) => {
  try {
    getMovieData(req, res);
  } catch (error) {
    next(error);
  }
});



//Catchalls should always be the last
app.get('*', (req, res) => {
  res.status(404).send('Uh oh! The page you are looking for does not exist');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
  next(err);
});
