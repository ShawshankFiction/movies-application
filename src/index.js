/**
 * es6 modules and imports
 */
//import $ from "jquery";
import {getMovies, addMovie, deleteMovie, editMovie} from "./api.js";

let movie = {title: "", genre: "", rating: 0, id: 0};

let Movies = [];

// Populates movies list
function refreshMovies(sort) {
    sort = typeof sort !== 'undefined' ? sort : 'id';

    $('#loading').show();
    $('#movie-full').hide();

    $('#movie-container').empty();

    getMovies(sort).then((dbMovie) => {

        //Adds movies to list from DB
        dbMovie.forEach(({title, rating, genre, id}) => {
            $('#movie-container').append(
                $('<tr>').append(
                    $(`<th scope="row" class="movie-title">`).text(title),
                    $(`<td class="movie-rating-${id}">`).text(rating),
                    $(`<td class="movie-genre-${id} ">`).text(genre),
                    $(`<td class="movie-edit">`).append(
                        $(`<button value="${id}" class="btn btn-outline-primary edit-btn">`).text("Edit")),
                    $('<td class="movie-delete ">').append(
                        $(`<button value="${id}" class="btn btn-outline-danger del-btn">`).text("Delete"))
                ));

            Movies.push(id, {title: title, rating: rating, genre: genre});

        });

        Movies = dbMovie;

        // Initilize the event handlers
        initEvents();

        // Hide loading text
        $('#loading').hide();
        $('#movie-full').show();

    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.');
        console.log(error);
    });

}

// Event listener for add movie click
$('#add-movie').click(function()  {
    $('#modal input').val("");
    $('.edit-button').attr("id","save-add");
    $('#modalLabel').html('Add Movie');
});


// Event listener for adding
$('#save-add').click(function() {
   let title = $('#title-edit').val();
   let genre = $('#genre-edit').val();
   let rating = $('#rating-edit').val();

    addMovie({title, genre, rating}).then(refreshMovies);

    $('#modal').modal('hide');
});


// Event handlers
function initEvents() {

    // Delete button creation
    $('.del-btn').click(function () {
        let confirmDel = confirm("Are you sure about this?");
        if (confirmDel) { deleteMovie($(this).attr("value")); }
        refreshMovies();
    });

    // Edit movie
    $('.edit-btn').click(function () {

        $('#modal').modal('show');

        $('#modalLabel').text('Edit Movie');
        $('.edit-button').attr("id","save-edit");

        let id = $(this).attr("value");

        //Get data from Movies
        $('#title-edit').val($(`.movie-title-${id}`).text());
        $('#genre-edit').val($(`.movie-genre-${id}`).text());
        $('#rating-edit').val($(`.movie-rating-${id}`).text());

        $('#save-edit').click(function () {

            movie.id = (id);
            movie.title = $('#title-edit').val();
            movie.rating = $('#rating-edit').val();
            movie.genre = $('#genre-edit').val();;

            editMovie().then(refreshMovies);

            $('#modal').modal('hide');
        });

    });

}


$('.sort-btn').click(function () {
    refreshMovies($(this).data('value'));
});

// First movie refresh
refreshMovies();