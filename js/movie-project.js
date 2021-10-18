const movieAPIURL = 'https://prong-lead-fold.glitch.me/movies'
const button = document.getElementsByClassName('newMovie')
$(document).ready(function () {
    alert("Loading...")


let submitMovie = document.querySelector("#submitMovie") //To get button to work



// function getMovies(){
fetch(movieAPIURL)
    .then((response) => {
        return response.json()
    })
    .then((movieData) => {
        console.log(movieData);
        for (let i = 0; i < movieData.length; i++) {

        }


        //    SEARCH BUTTON
        submitMovie.addEventListener('click', function (e) {
            e.preventDefault();

            let newMovieTitle = $('.newMovieTitle').val();
            let newMovieRating = $('.newMovieRating').val();

            var movieObject =
                {
                    title: newMovieTitle,
                    rating: newMovieRating,
                }

        })

        movieData.forEach((movie) => {
            console.log(movie.title)
            $('#movies').append(`<h3>Movie Title: ${movie.title.charAt(0).toUpperCase() + movie.title.slice(1)}</h3>
                <div>Rating: ${movie.rating} stars</div>
                <div>Actors: ${movie.actors} </div>
                <div>Year: ${movie.year}</div>
               
`)


        })


    })
// }
// getMovies();


// button.addEventListener('click', function(e){
//     e.preventDefault();
//     let newMovieTitle = $('.newMovieTitle').val();
//     let newMovieRating = $('.newMovieRating').val();
//
// var movieobject =
//     {
//         title: newMovieTitle,
//         rating: newMovieRating,
//     }
//
// })

})