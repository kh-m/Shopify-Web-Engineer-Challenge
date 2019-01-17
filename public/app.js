// jQuery will perform these once page has loaded
$(document).ready(function () {

    // Checks for when input field is empty, then clears search results
    $('#searchInput').keyup(function () {
        if ($('#searchInput').val() == '') {
            $('.searchresults').empty();
            console.log("It's empty!");
        }
    });

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

    // Listens to when the input field is cleared
    $('#searchInput').change(function () {
        if ($('#searchInput').val() == '') {
            $('.searchresults').empty();
            console.log("It's empty!");
        }
    });

    // Listens to clicks on the stars
    // toggles the favorite attribute
    // re-renders the favorties list
    $('ul.searchresults, ul.favorites').on('click', 'i', function () {
        console.log("star clicked!");
        // Sends the li's data.id to toggleFav()
        // SEARCHES AFTER 
        var id = $(this).parent().data('id');
        var fav = $(this).parent().data('favorite');
        
        toggleFav(id, fav);

        // RENDER FAVORITE LIST AGAIN
        

    });

});

// Prompted by user 'search'; empties displayed results and pass data onto findMatches
function search() {
    $('.searchresults').empty();
    // Fetches JSON API and passes it to findMatches or displays error if failed
    searchList();
    favoritesList();
    return new Promise(function(resolve, reject) {
        resolve("Completed search");
    })
};

// Searches API data for matches
function findMatches(items) {
    var searchVal = $('#searchInput').val();
    // Empties search results if input is empty, and exits function
    // if (searchVal == '') {
    //     $('.searchresults').empty();
    //     return;
    // }
    // Loops through each item in the API to find matches based on the search, then appends them to ul.searchresults in DOM
    items.forEach(function (item) {
        createLi(item, searchVal, '.searchresults');
        // $('.searchresults').append(newItem);
    })
};

// Searches for favorites in DB
function findFav(items) {
    $('.favorites').empty();
    console.log("finding favorites");
    // var searchVal = $('#searchInput').val();
    items.forEach(function (item) {
        if (item.favorite) {
            createLi(item, '', '.favorites');
        }
    })

    return new Promise(function(resolve, reject) {
        resolve("findFav(items) done");
    })
}

// Creates an <li> for a waste item
function createLi(item, searchVal, appendClass) {
    var title = item.title;
    var body = fixSyntax(item.body);
    var keywords = item.keywords;
    var id = item._id;
    var fav = item.favorite;
    
    /// The function searches for matches in the item's body, title & keywords.
    /// Can be made to listen to just keywords by replacing if statement with this one:
    // if(keywords.includes(searchVal)) {
    if (body.includes(searchVal) || title.includes(searchVal) || keywords.includes(searchVal)) {
        // creates a variable to give the star approparite div, based on if fav or not
        if (fav) {
            var starColor = "greenStar";
        } else {
            var starColor = "greyStar";
        }

        var newItem = '<li><i class="fas fa-star ' + starColor + '"></i><span class="title">' + title + '</span><span class="body">' + body + '</span></li>';
        // Turns newItem into HTML w/ jQuery
        newItem = $(newItem);
        // Adds an id data attribute to associate the element with it's corresponding DB _id
        newItem.data('id', id);
        newItem.data('favorite', fav);
        $(appendClass).append(newItem);
        console.log(item);
    };
}

// Sends PUT request to API to toggle 'favorite'
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
            // !!!!!!!! TURN THIS ON TO MAKE CODE FUNCTION AGAIN, but with a 'flash' !!!!!!!!! //
            search();

            toggleColor(changedFav);
        })
        // WORK HERE ON PROMISE TO:
        .then(favoritesList)
        .catch(function (err) {
            console.log("Didn't work", err);
        })
};

// Toggles color of clicked favorite star
function toggleColor(li) {
    console.log($(this).parent());

    var idOfLi = li._id;
    
    findClickedToggleColor('.searchresults > li');
    findClickedToggleColor('.favorites > li');

    //find the one who's data.id matches ifOfLi
    //pinpoint its <i> element and update it
    function findClickedToggleColor(element) {
        $(element).each(function (li) {
            console.log("HI");
    
            if ($(this).data('id') === idOfLi) {
                console.log("This is the correct STAR");
                console.log($(this).data('favorite'));
                $(this).children('i').toggleClass('greenStar');
                $(this).children('i').toggleClass('greyStar');
            } else {
                console.log("Didn't find the right STAR");
            }
        })
    }
}

// Renders search list
function searchList() {
    $.getJSON('/api/waste')
        .then(findMatches)
        .fail(displayError);
}

// Renders favorites list
function favoritesList() {
    $.getJSON('/api/waste')
        .then(findFav)
        .fail(displayError);
}

// Modifies syntax of API content to appropriate
function fixSyntax(body) {
    fixedBody = body
    .replace('&lt;p&gt;&amp;nbsp;&lt;/p&gt;', '')
    .replace(/&amp;nbsp;/g, '&nbsp')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/_self/g, '_blank')
    .replace(/<a href="/g, '<a target="_blank" href="');

    return fixedBody;
}


function displayError() {
    $('.searchresults').append('<h3>ERROR</h3><br><p>Could not connect to API. Please check your internet connection.</p>');
}

var starredItems = [];
