const movieAPIURL = 'https://prong-lead-fold.glitch.me/movies'
//Change this from alert to animation that goes away when data loads
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
            // for (let i = 0; i < movieData.length; i++) {
            //
            // }
            //    SEARCH BUTTON

            submitMovie.addEventListener('click', function (e) {
                e.preventDefault();
                let newMovieTitle = $('.newMovieTitle').val();
                let newMovieRating = $('.newMovieRating').val();
                const movieObject =
                    {
                        title: newMovieTitle,
                        rating: newMovieRating,
                    }

            // return movieObject;

                console.log(movieObject);
                movieData.push(movieObject)
                createMovie(movieObject);

            })

            function createMovie(movieObject){
                let options = {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(movieObject)
                }
                return fetch(movieAPIURL, options)
                    .then((response)=>response.json())

            }

            function deleteMovie(id){
                let options = {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json',
                    }
                };
                return fetch(`${movieAPIURL}/${id}`, options)
                    .then((response)=>console.log("Deleted movie with id: " + id))
            }
            //Adding our movies to our HTML page
function renderMovies() {
    movieData.forEach((movie) => {
        console.log(movie.title)
        console.log(movieData.indexOf(movie))
        let index = movieData.indexOf(movie)+2;
        $('#movies').append(`<h3>Movie Title: ${movie.title}</h3>
                <div>Rating: ${movie.rating} stars</div>
                <div>Actors: ${movie.actors} </div>
                <div>Year: ${movie.year}</div>
                <button class="deleteButtons" id="${index}">Delete Movie</button>
                <button class="editButton">Edit Movie Details</button>
`)
        $(`#${index}`).on("click", function(){
            console.log("I clicked a button")
            deleteMovie(`${index}`)
        })

    })
}
renderMovies();
        })

// }
// getMovies();


// button.addEventListener('click', function(e){
//     e.preventDefault();
//     let newMovieTitle = $('.newMovieTitle').val();
//     let newMovieRating = $('.newMovieRating').val();
// })

})