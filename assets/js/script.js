// select elements from HTML
var titleInputEl = document.querySelector('#search-title');
var enterBtn = document.querySelector('#enter');
var happyBtn = document.querySelector('#happy');
var fantasyBtn = document.querySelector('#fantasy');
var adventureBtn = document.querySelector('#adventure');
var horrorBtn = document.querySelector('#horror');
var mainpage = document.querySelector('.mainpage')
var apiKey = "50d14f268f52866ef75ec1d9d03faf7a";
var moodButtonsDiv = document.querySelector('.mood')
var genreBtn = document.querySelector('.genre-button')

// fetchMovie will get data from TMDb Api with what the user inputed
var pageNum = 1

function fetchMovie() {
    var keyword = titleInputEl.value.trim();
    var movie = keyword.replace(/\s+/g, '-');
    
    var requestUrl = "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&language=en-US&query=" + movie + "&page="+ pageNum + "&include_adult=false"
    
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
            chooseMovie.classList.add("choose-a-movie")
            chooseMovie.textContent = "Choose a movie:"
            mainpage.append(chooseMovie)

            //for loop to append movies
            var dataResults = movieData.results

            //create button containter
            var movieButtonContainer = document.createElement("div")
            mainpage.append(movieButtonContainer)
            movieButtonContainer.classList.add("button-container")

            for (var i = 0; i < dataResults.length; i++) {
                //create button with movie title names
                var movieTitleBtn = document.createElement("button")
                movieTitleBtn.textContent = movieData.results[i].original_title
                movieTitleBtn.classList.add("button", "movie-title-button")
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
            if (pageNum > 1){
                prevPage();
            }
        
            nextPage();
        })
}

function nextPage (){
var nextBtn = document.createElement("button")
nextBtn.textContent = "Next Page"
nextBtn.classList = "button primary"
nextBtn.setAttribute("class", "button")
nextBtn.style.background="#FACE7F"
nextBtn.style.color="black"
nextBtn.style.float="right"
mainpage.append(nextBtn)
nextBtn.addEventListener("click", function(){
pageNum = pageNum + 1 
console.log(pageNum)
fetchMovie(pageNum)
})

}

function prevPage (){
var prevBtn = document.createElement("button")
prevBtn.textContent = "Previous Page"
prevBtn.classList = "button primary"
prevBtn.setAttribute("class", "button")
prevBtn.style.background="#FACE7F"
prevBtn.style.color="black"
mainpage.append(prevBtn)
prevBtn.addEventListener("click", function(){
pageNum = pageNum - 1
console.log(pageNum)
fetchMovie(pageNum)
})
}


enterBtn.addEventListener("click", function(event){
    event.preventDefault();
    var keyword = titleInputEl.value.trim();
    console.log(keyword)
    if (keyword) {
        fetchMovie()
    } else {
        titleInputEl.setAttribute("placeholder", "Please enter a movie")
    }
});

happyBtn.addEventListener("click", function(event){
    event.preventDefault();
    var genreID = happyBtn.getAttribute("data-genre")
    genreSearch(genreID);
}
);

fantasyBtn.addEventListener("click", function(event){
    event.preventDefault();
    var genreID = fantasyBtn.getAttribute("data-genre")
    genreSearch(genreID);
}
);

adventureBtn.addEventListener("click", function(event){
    event.preventDefault();
    var genreID = adventureBtn.getAttribute("data-genre")
    genreSearch(genreID);
}
);

horrorBtn.addEventListener("click", function(event){
    event.preventDefault();
    var genreID = horrorBtn.getAttribute("data-genre")
    genreSearch(genreID);
}
);

//movie suggestions for mood buttons

function genreSearch(genreID) {
    var requestUrlGenre = "https://api.themoviedb.org/3/discover/movie?api_key=" + apiKey + "&language=en-US&sort_by=popularity.desc&with_genres=" + genreID + "&page=" + pageNum



    // //var movieID = movieTitleBtn.getAttribute("data-id")
    // function buttonByID(movieID) {
    //     movieTitleBtn.addEventListener("click", function () {
    //         fetchMovieDetails(movieID);
    //     })
    // }
    // buttonByID(movieID);

    console.log(genreID)
    console.log(requestUrlGenre)

    fetch(requestUrlGenre)
        .then(function (response) {
            return response.json();
        })
        .then(function (genreMovies) {
            console.log(genreMovies)
            mainpage.innerHTML = ""

            var chooseMovie = document.createElement("h2")
            chooseMovie.textContent = "Choose a movie:"
            mainpage.append(chooseMovie)

            var movieButtonContainer = document.createElement("div")
            mainpage.append(movieButtonContainer)
            movieButtonContainer.classList.add("button-container")

            //for loop to append 5 first movies
            
            var genreMoviesData = genreMovies.results

            for (var i = 0; i < genreMoviesData.length; i++) {
                //create button with movie title names
                var movieTitleBtn = document.createElement("button")
                movieTitleBtn.textContent = genreMovies.results[i].title
                movieTitleBtn.classList.add("button", "movie-title-button")
                var btnID = genreMovies.results[i].id
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
            if (pageNum > 1){
                prevPageGenre(genreID);
            }
        
            nextPageGenre(genreID);
        })
}

//next and previous buttons 
function nextPageGenre (genreID){
    var nextBtn = document.createElement("button")
    nextBtn.textContent = "Next Page"
    nextBtn.classList = "button primary"
    nextBtn.setAttribute("class", "button")
    nextBtn.style.background="#FACE7F"
    nextBtn.style.color="black"
    nextBtn.style.float="right"
    mainpage.append(nextBtn)
    nextBtn.addEventListener("click", function(){
    pageNum = pageNum + 1 
    console.log(pageNum)
    genreSearch(genreID, pageNum)
    })
    
}
    
function prevPageGenre (genreID){
var prevBtn = document.createElement("button")
prevBtn.textContent = "Previous Page"
prevBtn.classList = "button primary"
prevBtn.setAttribute("class", "button")
prevBtn.style.background="#FACE7F"
prevBtn.style.color="black"
mainpage.append(prevBtn)
prevBtn.addEventListener("click", function(){
    pageNum = pageNum - 1
    console.log(pageNum)
    genreSearch(genreID, pageNum)
    })
}

//movie details
function fetchMovieDetails(movieID) {
    var requestUrl = "https://api.themoviedb.org/3/movie/" + movieID + "?api_key=" + apiKey;
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (movieData) {
            console.log(movieData)
            mainpage.innerHTML = ""
            
            // create title and tagline, append to main page
            var newMovieTitle = document.createElement("h1")
            mainpage.append(newMovieTitle)
            newMovieTitle.textContent = movieData.title
            newMovieTitle.classList.add("new-title")

            var movieTagLine = document.createElement("p")
            mainpage.append(movieTagLine)
            movieTagLine.textContent = '"' + movieData.tagline + '"'
            movieTagLine.classList.add("tag-line")

            //create row container
            var row = document.createElement("div")
            mainpage.append(row)
            row.classList.add("row")

            //create poster container and append to row container 
            var posterContainer = document.createElement("div")
            row.append(posterContainer)
            posterContainer.classList.add("poster-container")

            //create poster el and append to poster container
            var movieImage = document.createElement("img")
            var posterPath = movieData.poster_path
            console.log (posterPath)
            movieImage.setAttribute("src", "https://image.tmdb.org/t/p/w154/" + posterPath)
            posterContainer.append(movieImage)

            //create movie info container and append to row container
            var movieInfoContainer = document.createElement("div")
            row.append(movieInfoContainer)
            movieInfoContainer.classList.add("movie-info-container", "columns", "small-6", "large-4")
            
    
            //create info elements and append to info container
            var movieOverview = document.createElement("p")
            var movieInfo = document.createElement("h2")
            var movieRelease = document.createElement("p")
            var movieRunTime = document.createElement("p")
            
            movieInfoContainer.append(movieInfo)    
            movieInfoContainer.append(movieOverview)
            movieInfoContainer.append(movieRelease)
            movieInfoContainer.append(movieRunTime)

            
            movieOverview.textContent = "Overview: " + movieData.overview
            movieInfo.textContent = "Movie Info"
            movieRelease.textContent = "Release Date: " + movieData.release_date
            movieRunTime.textContent = "Run Time: " + movieData.runtime + " mins"
            
           

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
            
            //create row container
            var row = document.createElement("div")
            mainpage.append(row)
            row.classList.add("row")

            //create review container div and append to row container
            var nytReviewDiv = document.createElement("div")
            row.append(nytReviewDiv)
            nytReviewDiv.classList.add("nyt-review-div", "columns", "small-6", "large-4")

            if (nytResults === null){
                var noReview = document.createElement("h2")
                noReview.textContent = "Sorry, no NYT Review for " + movieTitle
                row.append(nytReviewDiv)
                nytReviewDiv.append(noReview)
            } else {
                for ( var i = 0; i < nytResults.length; i++){
                    var nytDisplayTitle = nytData.results[i].display_title
                    console.log(nytDisplayTitle, movieTitle)
                    if (nytDisplayTitle === movieTitle){

                        //create review elements and append to review container
                        var nytReview = document.createElement("h2")
                        nytReview.textContent = "New York Times Review"
                        nytReviewDiv.append(nytReview)
                        
                        var headline = document.createElement("h4")
                        headline.textContent = nytData.results[i].headline
                        nytReviewDiv.append(headline)

                        var mpaaRating = document.createElement("h4")
                        mpaaRating.textContent = nytData.results[i].mpaa_rating
                        nytReviewDiv.append(mpaaRating)

                        var summaryShort = document.createElement("h4")
                        summaryShort.textContent = nytData.results[i].summary_short
                        nytReviewDiv.append(summaryShort)

                        var criticPick = document.createElement("h4")
                        var criticPickData = nytData.results[i].critics_pick
                        nytReviewDiv.append(criticPick)

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
                        link.textContent = "Read the review: " + linkUrl
                        nytReviewDiv.append(link)
                        link.classList.add("link")
                        console.log(linkUrl)
                        
                    }
                }
            }
            
        })
}

