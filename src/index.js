/**
 * es6 modules and imports
 */
import $ from "jquery";
import getMovies from "./api.js";

/**
 * require style imports
 */

getMovies().then((movies) => {

  $('#loading').css('display', 'none');
  $('#movieContainer').append("<ul>");
  movies.forEach(({title, rating, id}) => {
    $('#movieContainer').append(`<li>id#${id} - ${title} - rating: ${rating}</li>`);
  });
  $('#movieContainer').append("</ul>");
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});
