const movieAPIURL = 'https://prong-lead-fold.glitch.me/movies'

function getMovies(){
    return fetch(movieAPIURL)
        .then((response)=>console.log(response.json()));
}