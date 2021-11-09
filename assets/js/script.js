// select elements from HTML
var titleInputEl = document.querySelector('#search-title');
var enterBtn = document.querySelector('#enter');
var happyBtn = document.querySelector('#happy');
var sadBtn = document.querySelector('#sad');
var romanceBtn = document.querySelector('#romance');
var actionBtn = document.querySelector('#action');
var mainpage = document.querySelector('.mainpage')
var apiKey = "50d14f268f52866ef75ec1d9d03faf7a";

// movie input
var formSubmitHandler = function (event) {
  event.preventDefault();

  var movieInput = titleInputEl.value.trim();

  if (movieInput) {
    fetchMovie(movieInput);

    titleInputEl.value = '';
  } else {
    alert('Movie not found');
  }
};

// fetchMovie will get data from TMDb Api with what the user inputed

function fetchMovie(event) {
    event.preventDefault();    
    var keyword = titleInputEl.value.trim();
    var requestUrl = "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&language=en-US&query=" + keyword + "&page=1&include_adult=false"
    
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (movieData) {
        
            console.log(movieData)

            //clears the mainpage
            mainpage.innerHTML=""
            
            //create button with movie title names
            var movieTitleBtn= document.createElement("button")
            movieTitleBtn.textContent= movieData.results[0].original_title
            mainpage.append(movieTitleBtn)
            movieTitleBtn.classList="button primary"
            movieTitleBtn.setAttribute("data-id", movieID)

            console.log(movieData.results[0].id)  
            var movieID = movieData.results[0].id 
            var movieDataTitle = movieData.results[0].original_title
            movieTitleBtn.addEventListener("click", function(event){
                event.preventDefault();
                fetchMovieDetails(movieID);
                fetchNYTReview(movieDataTitle);
            })
           })
}

    enterBtn.addEventListener("click", fetchMovie);

function fetchMovieDetails(movieID){
    var requestUrl = "https://api.themoviedb.org/3/movie/" + movieID + "?api_key=" + apiKey;
    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (movieData) {
        console.log(movieData)    
        mainpage.innerHTML="" 
        var newMovieTitle = document.createElement("h1")
        newMovieTitle.textContent = movieData.original_title
        mainpage.append(newMovieTitle)

    })
}

function fetchNYTReview(movieDataTitle){
    var apiKeyNYT = "e5vmiDaoq5lQjo2shrZE0LW5iZ0o475e"
    var requestUrl = "https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=" + movieDataTitle + "&api-key=" + apiKeyNYT;
    

    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (NYTData) {
        console.log(NYTData)
           
})
}


