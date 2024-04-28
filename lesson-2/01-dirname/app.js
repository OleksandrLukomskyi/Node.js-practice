const movies = require("./movies/index");

movies
  .readMovies()
  .then((data) => console.log(data))
  .catch((error) => console.error(error));

// movies()
// .then((data) => console.log(data))
// .catch((error) => console.error(error));
