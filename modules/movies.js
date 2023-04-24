// const axios = require('axios');
const { cacheData} = require('../cache');

class Movie {
  constructor(movieObj) {
    this.id = movieObj.id;
    this.title = movieObj.title;
    this.overview = movieObj.overview;
    this.avgVotes = movieObj.vote_average;
    this.totalVotes = movieObj.vote_count;
    this.imgUrl = movieObj.poster_path;
    this.popularity = movieObj.popularity;
    this.releaseDate = movieObj.release_date;
  }
}

const getMovieData = async (req, res, next) => {
  try {
    let city = req.query.city;

    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&query=${city}`;

    let key = `moviedb-key-${city}`;

    cacheData(res, key, url, 'results', Movie, 7);

  } catch (error) {
    next(error);
  }
};

module.exports = { getMovieData };
