// select elements from HTML
var titleInputEl = document.querySelector('#search-title');
var enterBtn = document.querySelector('#enter');
var happyBtn = document.querySelector('#happy');
var sadBtn = document.querySelector('#sad');
var romanceBtn = document.querySelector('#romance');
var actionBtn = document.querySelector('#action');

// movie input
var formSubmitHandler = function (event) {
  event.preventDefault();

  var movieInput = titleInputEl.value.trim();

  if (movieInput) {
    fetchMovie(movieInput);

    titleInputEl.value = '';
  } else {
    // alert('Please enter a GitHub username');
  }
};

// fetchMovie will get data from TMDb Api with what the user inputed