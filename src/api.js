module.exports = {
  getMovies: (sort, query, order) => {
      // set defaults
      query = typeof query !== 'undefined' ? query : '';
      sort = typeof sort !== 'undefined' ? sort : 'title';
      order = typeof order !== 'undefined' ? order : 'asc';

    return fetch(`/api/movies?q=${query}&_sort=${sort}&_order=${order}`)
      .then(response => response.json());
  },

    deleteMovie: (id) => {
    return fetch(`/api/movies/${id}`,
        {
            method: 'delete'
        }).then(response => response.json());

  },
  editMovie: (movie) => {
    return fetch(`/api/movies/${movie.id}`,
        {
          method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movie)

        }).then(response => response.json());

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
