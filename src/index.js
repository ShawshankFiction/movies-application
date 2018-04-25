/**
 * es6 modules and imports
 */
//import $ from "jquery";
import {getMovies, addMovie, deleteMovie, editMovie} from "./api.js";


/**
 * require style imports
 */

const movie = [0, [{ title: "", rating: 0, genre: ""}]];

console.log(movie);

let addedMovie = Object.create(movie);


var Movies = [];

// Populates movies list
getMovies().then((dbMovie) => {


  //Adds movies to list from DB
    dbMovie.forEach( ({title, rating, genre, id})  => {
     $('#movie-container').append(
         $('<div class="row">').append(

             $('<div class="movie-title col-3">').text(title),
             $('<div class="movie-rating col-3">').text(rating),
             $('<div class="movie-genre col-2">').text(genre),
             $('<div class="movie-edit col-2">').append(
                  $(`<button value="${id}" class="edit-btn">`).text("Edit")),
             $('<div class="movie-delete col-2">').append(
                 $(`<button value="${id}" class="del-btn">`).text("Delete"))
         ));


        Movies.push(id, { title: title, rating: rating, genre: genre} );

  });

  Movies = dbMovie;
    console.log(Movies);

    $('.del-btn').click(function() {
        // TODO: add are you sure about delete
       let confirmDel = confirm("Are you sure about this?");
        if(confirmDel) { deleteMovie($(this).attr("value")); }
    });


    //
    $('.edit-btn').click(function(){
        $('#modal').modal('show');
        $('#submit-edit').hide();

        let id = $(this).attr("value")-1;

        //Get data from Movies
        $('#title-edit').val(Movies[id].title);
        $('#genre-edit').val(Movies[id].genre);
        $('#rating-edit').val(Movies[id].rating);

        $('#save-edit').show();
        $('#save-edit').click(function(){
            editThisMovie((id + 1), $('#title-edit').val(), $('#rating-edit').val(), $('#genre-edit').val());
            console.log(movie);
            editMovie(movie);
            $('#save-edit').hide();
            $('#modal').modal('hide');

        });


    });


    // Hide loading text
    $('#loading').hide();
    $('#movie-container').show();

}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});

$('#submit-edit').click(function() {
    addedMovie.title = $('#title-edit').val();
    addedMovie.genre = $('#genre-edit').val();
    addedMovie.rating = $('#rating-edit').val();

    addMovie(addedMovie);
    $('#modal').modal('hide');

});


