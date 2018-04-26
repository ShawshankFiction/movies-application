/**
 * es6 modules and imports
 */
import {getMovies, addMovie, deleteMovie, editMovie} from "./api.js";

// Populates movies list
function refreshMovies(sort) {
    sort = typeof sort !== 'undefined' ? sort : 'id';

    // Unbinds all event handlers
    $("body").find("*").each(function() {
        $(this).off("click");
    });

    $('#loading').show();
    $('#movie-full').hide();

    $('#movie-container').empty();

    getMovies(sort).then((dbMovies) => {

        //Adds movies to list from DB
        dbMovies.forEach(({title, rating, genre, id}) => {
            $('#movie-container').append(
                $('<tr>').append(
                    $(`<th scope="row" class="movie-title-${id}">`).text(title),
                    $(`<td class="movie-rating-${id}">`).text(rating),
                    $(`<td class="movie-genre-${id} ">`).text(genre),
                    $(`<td class="movie-edit">`).append(
                        $(`<button value="${id}" class="btn btn-outline-primary edit-btn">`).text("Edit")),
                    $('<td class="movie-delete ">').append(
                        $(`<button value="${id}" class="btn btn-outline-danger del-btn">`).text("Delete"))
                ));

        });

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


// Create event handlers, after object creation in the DOM
function initEvents() {

    // Delete button
    $('.del-btn').click(function () {
        let confirmDel = confirm("Are you sure about this?");
        if (confirmDel) { deleteMovie($(this).attr("value")); }
        refreshMovies();
    });

    // Edit movie
    $('.edit-btn').click(function () {
        editor('edit', $(this).attr("value"));
    });

    // Event listener for add movie click
    $('#add-movie').click(function()  {
        editor();
    });

    // Sort based on value of button
    $('.sort-btn').click(function () {
        refreshMovies($(this).data('value'));
    });

    // Save Edit/Add
    $('#save-edit-btn').click(function () {

        let id = $('#id-edit').val();
        let title = $('#title-edit').val();
        let rating = $('#rating-edit').val();
        let genre = $('#genre-edit').val();

        if ($(this).data('action') === 'edit') {
            editMovie({title: title, genre: genre, rating: rating, id: id}).then(refreshMovies);
        }

        if ($(this).data('action') === 'add') {
            addMovie({title, genre, rating}).then(refreshMovies);
        }

        $('#modal').modal('hide');

    });

}

// Initialize editor
function editor(type, id) {
    type = typeof type !== 'undefined' ? type : 'add';
    id = typeof id !== 'undefined' ? id : 0;

    // clear all inputs
    $('#modal input').val("");

    $('#modal').modal('show');

    if (type === "edit") {

        $('#modalLabel').text('Edit Movie');
        $('#save-edit-btn').attr("data-action","edit");

        //Get data from Movies
        $('#title-edit').val($(`.movie-title-${id}`).text());
        $('#genre-edit').val($(`.movie-genre-${id}`).text());
        $('#rating-edit').val($(`.movie-rating-${id}`).text());
        $('#id-edit').val(id);

    } else {

        $('#modalLabel').html('Add Movie');
        $('#save-edit-btn').attr("data-action","add");

    }

}


// First movie refresh
refreshMovies();