const movieAPIURL = 'https://prong-lead-fold.glitch.me/movies'

//Change this from alert to animation that goes away when data loads
function createMovie(movieObject) {
    let options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieObject)
    }
    return fetch(movieAPIURL, options)
        .then((response) => response.json())

}


function deleteMovie(id) {
    let options = {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        }
    };
    return fetch(`${movieAPIURL}/${id}`, options)
        .then((response) => console.log("Deleted movie with id: " + id))


}


function editMovie(id, title, rating, plot, year, genre, actors) {
    let options = {
        method: "PATCH",
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
        },
        // body: JSON.stringify(movie)
        body: JSON.stringify({
            title: title,
            rating:  rating,
            plot: plot,
            year: year,
            genre: genre,
            actors: actors
        })

    };
    return fetch(`${movieAPIURL}/${id}`, options)
        .then((response) => response.json())
        .then((movie) =>{
            console.log(movie)
            $("#movies").html("");
            fetch(movieAPIURL)
                .then((response) => {
                    return response.json()
                })
                .then((movieData) => {
                    console.log(movieData);

                    //Adding our movies to our HTML page
                    renderMovies(movieData);
                })
        })
}

// function toggleEditPage() {
//     var editPage = document.getElementById("edit")
//     var displaySetting = editPage.style.display;
//     var editButton = document.getElementById("editButton");
//     if (displaySetting === "block") {
//         editPage.style.display = "none";
//         editButton.innerHTML = "Show Edit Page"
//     } else {
//         editPage.style.display = "block";
//         editButton.innerHTML = "Hide Edit Page"
//     }
// }

function renderMovies(movieData) {
    movieData.forEach((movie) => {
        console.log(movie.title)
        console.log(movieData.indexOf(movie))
        let index = movieData.indexOf(movie) + 2;
        let edits = movieData.indexOf(movie) + 2;
        $('#movies').append(`<h3>Movie Title: ${movie.title}</h3>
                <div>Rating: ${movie.rating} stars</div>
                <div>Actors: ${movie.actors} </div>
                <div>Year: ${movie.year}</div>
                   <!--                Movie Form     -->
                <form id="movieDetails${index}">
                             
                    Movie Title:<br> <input class="newMovieTitle1" type="text" name="title" value="${movie.title}">
                    <br>
                    Movie Rating: <br> <input class="newMovieRating1" type="text" name="rating" value="${movie.rating}">
                    <br>
                    Movie Year: <br> <input class="newMovieYear" type="text" name="year" value="${movie.year}">
                    <br>
                    Movie Genre: <br> <input class="newMovieGenre" type="text" name="genre" value="${movie.genre}">
                    <br>
                    Movie Director: <br> <input class="newMovieDirector" type="text" name="director" value="${movie.director}">
                    <br>
                    Movie Plot: <br> <input class="newMoviePlot" type="text" name="plot" value="${movie.plot}">
                    <br>
                    Movie Actors: <br> <input class="newMovieActors" type="text" name="actors" value="${movie.actors}">
                    <br>
            </form>
<!--Buttons-->
                <button class="deleteButtons" id="${index}">Delete Movie</button>
                <button class="editPage" id='e${edits}'>Edit Movie</button>
        `)

        // $(`#${index}`).on("click", function () {
        //     console.log("I clicked a button")
        //     deleteMovie(`${index}`)
        //     renderMovies()
        // })


    })}        //THERE IS A LOT OF SAUCE
                        //delMovie > returns promiseObj
                        //.then(cbFn(){fetch(movieURL) < getting fresh movies from db [SHOULD BE WITHOUT THE MOVIE WE DELETED]
                        //.then(response => response.json()) json our resp
                        //.then(movies => . . code to render movies)

    $(document).ready(function () {
        alert("Loading...")
        let submitMovie = document.querySelector("#submitMovie") //To get button to work

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
            // movieData.push(movieObject)
            createMovie(movieObject).then((jsonData) => {
                console.log(jsonData);
                fetch(movieAPIURL).then((response) => response.json())
                    .then((movies) => {
                        $("#movies").html("") //clears out movies
                        renderMovies(movies)
                    })
            });

        })


        fetch(movieAPIURL)
            .then((response) => {
                return response.json()
            })
            .then((movieData) => {
                console.log(movieData);

                //Adding our movies to our HTML page
                renderMovies(movieData);
            })

        $(document).on("click", ".deleteButtons",  function () {
            console.log("I clicked a button")
            deleteMovie($(this).attr("id")) //this button get id attribute

                .then(function(data){fetch(movieAPIURL)
                    .then((data) => data.json()).then((movies) => {
                            $("#movies").html("")
                            console.log(movies);
                            renderMovies(movies)
                        }
                    )
                })})
        $(document).on("click", ".editPage", function () {
            console.log("I clicked a button")
            let id = $(this).attr("id").slice(1);
            console.log($(`#movieDetails${id}`).children());
            let formChildren = $(`#movieDetails${id}`).children();
            console.log(formChildren);
            let title = formChildren.eq(1).val();
            let rating = formChildren.eq(4).val();
            let year= formChildren.eq(7).val();
            let genre = formChildren.eq(10).val();
            let plot = formChildren.eq(16).val();
            let actors = formChildren.eq(19).val();
            editMovie(id, title, rating, plot, year, genre, actors)

        })
        //
        //slice at 1 which is our e

        // $(`#${edits}`).click(function (e) {
        //     e.preventDefault();
        //     console.log("I clicked a button")
        //     document.getElementById("#movieDetails").style.display = "none";
        //     toggleEditPage();
        // })

    })


