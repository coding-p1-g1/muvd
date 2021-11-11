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
            mainpage.innerHTML = ""

            //create and append some text to the button page
            var chooseMovie = document.createElement("h2")
            chooseMovie.textContent = "Choose a movie:"
            mainpage.append(chooseMovie)

            //for loop to append 5 first movies
            var dataResults = movieData.results
            for (var i = 10; i < dataResults.length; i++) {
                var movieButtonContainer = document.createElement("div")
                mainpage.append(movieButtonContainer)
                movieButtonContainer.classList.add("button-container")

                //create button with movie title names
                var movieTitleBtn = document.createElement("button")
                movieTitleBtn.textContent = movieData.results[i].original_title
                movieTitleBtn.classList = "button primary"
                var btnID = movieData.results[i].id
                movieTitleBtn.setAttribute("data-id", btnID)
                movieButtonContainer.append(movieTitleBtn)

                // console.log(btnID)

                var movieID = movieTitleBtn.getAttribute("data-id")
                function buttonByID(movieID) {
                    movieTitleBtn.addEventListener("click", function () {
                        fetchMovieDetails(movieID);
                    })
                }
                buttonByID(movieID);
            }
        })
}

enterBtn.addEventListener("click", fetchMovie);

function fetchMovieDetails(movieID) {
    var requestUrl = "https://api.themoviedb.org/3/movie/" + movieID + "?api_key=" + apiKey;
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (movieData) {
            console.log(movieData)
            mainpage.innerHTML = ""


            //create row container
            var row = document.createElement("div")


            //create movie info container and append to row container
            var movieInfoContainer = document.createElement("div")
            row.append(movieInfoContainer)

            //create info elements and append
            var newMovieTitle = document.createElement("h1")
            var movieOverview = document.createElement("p")
            var movieRelease = document.createElement("p")
            var movieRunTime = document.createElement("p")
            var movieTagLine = document.createElement("p")
            document.body.append(newMovieTitle)
            document.body.append(movieTagLine)
            document.body.append(row)
            movieInfoContainer.append(movieOverview)
            movieInfoContainer.append(movieRelease)
            movieInfoContainer.append(movieRunTime)


            //setting text content for movie info
            newMovieTitle.textContent = movieData.original_title
            movieOverview.textContent = "Overview: " + movieData.overview
            movieRelease.textContent = "Release Date: " + movieData.release_date
            movieRunTime.textContent = "Run Time: " + movieData.runtime + " mins"
            movieTagLine.textContent = '"' + movieData.tagline + '"'

            //setting classes for containers
            row.classList.add("row")
            movieInfoContainer.classList.add("movie-info-container", "columns", "small-6", "large-4")


            //setting classes for info elements 
            newMovieTitle.classList.add("new-title")
            movieTagLine.classList.add("tag-line")







            var newMovieDate = movieData.release_date
            console.log(newMovieDate)

            var movieTitle = newMovieTitle.textContent
            fetchNYTReview(movieTitle, newMovieDate)
            console.log(movieTitle)

        })
}

function fetchNYTReview(movieTitle, newMovieDate) {
    var apiKeyNYT = "e5vmiDaoq5lQjo2shrZE0LW5iZ0o475e"
    var requestUrl = "https://api.nytimes.com/svc/movies/v2/reviews/search.json?publication-date=" + newMovieDate + ":" + newMovieDate + "&query=" + movieTitle + "&api-key=" + apiKeyNYT;

    console.log(movieTitle)
    console.log(requestUrl)

    console.log(newMovieDate)

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (nytData) {
            console.log(nytData)

        })
}
