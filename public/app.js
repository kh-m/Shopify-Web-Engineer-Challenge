// jQuery will perform these once page has loaded
$(document).ready(function() {
    // listens to 'enter' in input field
    $('#searchInput').keypress(function(event) {
        if(event.which == 13) {
            console.log("Pressed enter");
            search();
        }
    });

    // listens to 'click' on search button
    $('#searchButton').click(function() {
        console.log("Clicked search button");
        search();
    });

});

function search(items) {
    // empty results
    $('.searchresults').empty();
    $.getJSON("https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000")
        .then(findMatches)
}

function findMatches(items) {
    items.forEach(function(item) {
        var searchVal = $('#searchInput').val();
        var title = item.title;
        var body = (item.body).replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;nbsp;/g, '&nbsp');
        var keywords = item.keywords;
        var id = item.id;
        // var starred = //if its in starredItems it's true
        if(body.includes(searchVal) || title.includes(searchVal) || keywords.includes(searchVal)) {
            var newItem = $('<li><i class="fas fa-star"></i><span class="title">'+ title +'</span><span class="body">'+ body +'</span></li>');
            $('.searchresults').append(newItem);
            console.log(item);
        };
    })
}

function log(items) {
    console.log(items);
};

var starredItems = [];
