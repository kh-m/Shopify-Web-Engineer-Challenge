// jQuery will perform these once page has loaded
$(document).ready(function () {
    // listens to 'enter' in input field
    $('#searchInput').keypress(function (event) {
        if (event.which == 13) {
            console.log("Pressed enter");
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
    $('ul.searchresults').on('click', 'i', function() {
        console.log("star clicked!");
        $(this).toggleClass('greyStar');
        $(this).toggleClass('greenStar');
        
    });

    // Checks for favorites
    

});

// Prompted by user 'search'; empties displayed results and pass data onto findMatches
function search() {
    $('.searchresults').empty();
    // Fetches JSON API and passes it to findMatches or displays error if failed
    $.getJSON("https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000")
        .then(findMatches)
        .fail(displayError);
}

// Searches API data for matches
function findMatches(items) {
    var searchVal = $('#searchInput').val();
    // Empties search results if input is empty, and exits function
    if (searchVal == '') {
        $('.searchresults').empty();
        return;
    }

    // Loops through each item in the API to find matches based on the search, then appends them to ul.searchresults in DOM
    items.forEach(function (item) {
        var title = item.title;
        // Replaces text such that HTML syntax is appropriate + removing randomly anomalous appearing <p> with nbsp
        var body = (item.body).replace('&lt;p&gt;&amp;nbsp;&lt;/p&gt;', '').replace('&amp;nbsp;', '&nbsp').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
        var keywords = item.keywords;
        var id = item.id;
        // var starred = //if its in starredItems it's true
        /// The function searches for matches in the item's body, title & keywords.
        /// Can be made to listen to just keywords by replacing if statement with this one:
        // if(keywords.includes(searchVal)) {
        if (body.includes(searchVal) || title.includes(searchVal) || keywords.includes(searchVal)) {
            var newItem = '<li><i class="fas fa-star"></i><span class="title">' + title + '</span><span class="body">' + body + '</span></li>';
            // Turns newItem into HTML w/ jQuery
            newItem = $(newItem);
            $('.searchresults').append(newItem);
            $('.searchresults li i').addClass('greyStar');
            console.log(item);
        };
    })
};

function displayError() {
    $('.searchresults').append('<h3>ERROR</h3><br><p>Could not connect to API. Please check your internet connection.</p>');
}

// function checkStar(htmlAsString) {
//     if (htmlAsString.includes('greenStar')) {
//         console.log("it's green!");
//         return;
//     } else {
//         console.log("it's grey!");
//         // htmlAsString.replace('fa-star', 'fa-star greyStar');
//     }
// }

var starredItems = [];
