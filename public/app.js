// jQuery will perform these once page has loaded
$(document).ready(function () {

    // listens to 'enter' in input field
    $('#searchInput').keypress(function (event) {
        if (event.which == 13) {
            console.log("Pressed enter");
            console.log(event);
            search();
        }
    });

    // Listens to 'click' on search button
    $('#searchButton').click(function () {
        console.log("Clicked search button");
        search();
    });

    // Checks for when input field is empty, then clears search results
    $('#searchInput').keyup(function () {
        if ($('#searchInput').val() == '') {
            $('.searchresults').empty();
            console.log("Input field is empty");
        }
    });

    // Listens to clicks on the stars
    $('ul.searchresults, ul.favorites').on('click', 'i', function () {
        console.log("star clicked!");
        var id = $(this).parent().data('id');
        var fav = $(this).parent().data('favorite');

        toggleFav(id, fav);
    });

});

// Prompted by user 'search'; empties displayed results and pass data onto findMatches
function search() {
    $.getJSON('/api/waste')
        .then(handleSearchResponse)
        .fail(displayError);
};


function handleSearchResponse(res) {
    findMatches(res);
    findFav(res);
};

// Searches API data for matches
function findMatches(items) {
    $('.searchresults').empty();
    var searchVal = $('#searchInput').val();
    // Exits if input is empty, so that it does not also render the starred items in the search results
    if (!searchVal) return;

    // Loops through each item in the DB to find matches based on the search, then appends them to ul.searchresults in DOM
    items.forEach(function (item) {
        createLi(item, searchVal, '.searchresults');
    })
};

// Searches for favorites in DB
function findFav(items) {
    $('.favorites').empty();
    console.log("finding favorites");

    // Loops through each item in the DB to find favorites, then appends them to ul.favorites in DOM
    items.forEach(function (item) {
        if (item.favorite) {
            createLi(item, '', '.favorites');
        }
    })
};

// Creates an <li> for a waste item
function createLi(item, searchVal, appendClass) {
    var title = item.title;
    var body = fixSyntax(item.body);
    var keywords = item.keywords;
    var id = item._id;
    var fav = item.favorite;

    /// Searches for matches in the item's keywords
    if (keywords.includes(searchVal)) {
        // creates a variable to give the star approparite div, based on if fav or not
        if (fav) {
            var starColor = "greenStar";
        } else {
            var starColor = "greyStar";
        }

        var newItem = '<li><i class="fas fa-star ' + starColor + '"></i><span class="title">' + title + '</span><span class="body">' + body + '</span></li>';
        // Turns newItem into HTML w/ jQuery
        newItem = $(newItem);
        // Adds 'id' and 'favorite' data attribute to associate the element with it's corresponding DB _id
        newItem.data('id', id);
        newItem.data('favorite', fav);
        $(appendClass).append(newItem);
    }
};

// Sends PUT request to API to toggle 'favorite' in DB
function toggleFav(id, fav) {
    $.ajax({
        method: 'PUT',
        url: '/api/waste',
        data: {
            _id: id,
            favorite: !fav
        }
    })
        .then(function (changedFav) {
            console.log(changedFav);
        })
        //
        .then(search)
        .catch(function (err) {
            console.log("Didn't work", err);
        })
};

// Modifies syntax of API body to appropriate
function fixSyntax(body){
    var el = document.createElement('textarea');
    el.innerHTML = body;
    
    return el.value.replace(/_self/g, '_blank').replace(/<a href="/g, '<a target="_blank" href="');
}

// Displays error message if cannot connect to API
function displayError() {
    $('.searchresults').append('<h3>ERROR</h3><br><p>Could not connect to API. Please check your internet connection.</p>');
};
