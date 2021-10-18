const movieAPIURL = 'https://prong-lead-fold.glitch.me/movies'
const button = document.getElementsByClassName('newMovie')
$(document ).ready(function(){
    alert("Loading...")
})


// function getMovies(){
    fetch(movieAPIURL)
        .then((response)=> {return response.json()})
        .then((movieData) =>{
            console.log(movieData);
            movieData.forEach((movie)=>{console.log(movie.title)})
        })
// }
// getMovies();



button.addEventListener('click', function(e){
    e.preventDefault();
    let newMovie = $('.newMovie').val();
})

for(let i=0; i < movieData.length; i++){
    $('.movies').html(movieData[i])
}