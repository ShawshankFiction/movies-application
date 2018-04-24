/**
 * es6 modules and imports
 */
import $ from "jquery";
import {getMovies, addMovie} from "./api.js";


/**
 * require style imports
 */

const movie = {id: 0, title: "", rating: 0, genre: ""};

let addedMovie = Object.create(movie);

var moviesArray = [];

console.log(moviesArray);



getMovies().then((movies) => {
  let i = 0;
  $('#loading').css('display', 'none');
  $('#movieContainer').append("<ul>");
  movies.forEach(({title, rating, id}) => {
    $('#movieContainer').append(`<li>id#${id} - ${title} - rating: ${rating}</li>`);
    moviesArray.push(movies[i]);
    i++;
  });
  $('#movieContainer').append("</ul>");
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});

$('#submit-edit').click(function() {
    addedMovie.title = $('#title-edit').val();
    addedMovie.genre = $('#genre-edit').val();
    addedMovie.rating = $('#rating-edit').val();
    addedMovie.id = moviesArray.length + 1;
    console.log(addedMovie);
    moviesArray.push(addedMovie);
    console.log(moviesArray);
    addMovie(addedMovie);

});
