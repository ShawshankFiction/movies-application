/**
 * es6 modules and imports
 */
//import $ from "jquery";
import {getMovies, addMovie, deleteMovie, editMovie} from "./api.js";


/**
 * require style imports
 */

const movie = {id: 0, title: "", rating: 0, genre: ""};

let addedMovie = Object.create(movie);

var moviesArray = [];


function editThisMovie(id, title, rating, genre){
    movie.id = id;
    movie.title = title;
    movie.rating = rating;
    movie.genre = genre;
}

console.log(moviesArray);



getMovies().then((movies) => {
  let i = 0;
  $('#loading').css('display', 'none');
  $('#movieContainer').append("<ul>");
  movies.forEach(({title, rating, id}) => {
    $('#movieContainer').append(`<li>id#${id} - ${title} - rating: ${rating}</li><button value = ${id} class = deleteBtn>Delete</button>
    <button value = ${id} class = editBtn>Edit</button>`);
    moviesArray.push(movies[i]);
    i++;
  });
  $('#movieContainer').append("</ul>");

    $('.deleteBtn').click(function() {
        console.log("hola");

        deleteMovie($(this).attr("value"));
    });
    $('.editBtn').click(function(){
        $('#modal').modal('show');
        $('#submit-edit').css('display', 'none');
        console.log($(this).attr("value"));
        let id = $(this).attr("value") - 1;
        $('#title-edit').val(moviesArray[id].title);
        $('#genre-edit').val(moviesArray[id].genre);
        $('#rating-edit').val(moviesArray[id].rating);

        $('#save-edit').show();
        $('#save-edit').click(function(){
            editThisMovie((id + 1), $('#title-edit').val(), $('#rating-edit').val(), $('#genre-edit').val());
            console.log(movie);
            editMovie(movie);
            $('#save-edit').hide();

        });
    });

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
    $('#modal').modal('hide');

});


