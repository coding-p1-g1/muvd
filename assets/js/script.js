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
    var movie = keyword.replace(/\s+/g, '-');
    var requestUrl = "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&language=en-US&query=" + movie + "&page=1&include_adult=false"

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

            //create button containter
            var movieButtonContainer = document.createElement("div")
            mainpage.append(movieButtonContainer)
            movieButtonContainer.classList.add("button-container")

            for (var i = 0; i < dataResults.length; i++) {
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
            mainpage.append(newMovieTitle)
            mainpage.append(movieTagLine)
            mainpage.append(row)
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








            var movieTitle = newMovieTitle.textContent
            fetchNYTReview(movieTitle)
            console.log(movieTitle)

        })
}

function fetchNYTReview(movieTitle) {
    var apiKeyNYT = "e5vmiDaoq5lQjo2shrZE0LW5iZ0o475e"
    var title = movieTitle.replace(/\s+/g, '_');
    console.log(title)
    var nytRequestUrl = "https://api.nytimes.com/svc/movies/v2/reviews/search.json?&query=" + title + "&api-key=" + apiKeyNYT

    console.log(movieTitle)
    console.log(nytRequestUrl)

    fetch(nytRequestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (nytData) {
            console.log(nytData)
            var nytResults = nytData.results
            var nytReviewDiv = document.createElement("div")
            mainpage.append(nytReviewDiv)

            if (nytResults === null){
                var noReview = document.createElement("h2")
                noReview.textContent = "Sorry, no NYT Review for " + movieTitle
                nytReviewDiv.append(noReview)
            } else {
                for ( var i = 0; i < nytResults.length; i++){
                    var nytDisplayTitle = nytData.results[i].display_title
                    console.log(nytDisplayTitle, movieTitle)
                    if (nytDisplayTitle === movieTitle){

                        //Add NYT Review section
                        var nytReview = document.createElement("h2")
                        nytReview.textContent = "New York Times Review"
                        mainpage.append(nytReview)
                        
                        var headline = document.createElement("h4")
                        headline.textContent = nytData.results[i].headline
                        mainpage.append(headline)

                        var mpaaRating = document.createElement("h4")
                        mpaaRating.textContent = nytData.results[i].mpaa_rating
                        mainpage.append(mpaaRating)

                        var summaryShort = document.createElement("h4")
                        summaryShort.textContent = nytData.results[i].summary_short
                        mainpage.append(summaryShort)

                        var criticPick = document.createElement("h4")
                        var criticPickData = nytData.results[i].critics_pick
                        mainpage.append(criticPick)

                        if (criticPickData === 1){
                            criticPick.textContent = "This is a critic pick 👍"
                        } else{
                            criticPick.textContent = "This is not a critic pick 👎"
                        }

                        //link for NYT review
                        var link = document.createElement("a")
                        var linkUrl = nytData.results[i].link.url
                        link.setAttribute("href", linkUrl)
                        link.setAttribute("target", "_blank")
                        link.textContent = linkUrl
                        mainpage.append(link)
                        console.log(linkUrl)
                        
                    }
                }
            }
            
        })
}
