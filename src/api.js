module.exports = {
  getMovies: () => {
    // TODO: add sort rating/title/genre
    return fetch('/api/movies')
      .then(response => response.json());
  },
    deleteMovie: (id) => {

  },
  editMovie: (id) => {

  },
  addMovie: (movie) => {
     return fetch(`/api/movies`,
                  {
                      method: 'post',
                      headers: {
                          'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(movie)
                  }).then(response => response.json());
  }
};
