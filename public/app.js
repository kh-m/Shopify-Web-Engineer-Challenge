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
    $.getJSON("https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000")
        .then(findMatches)
}

function findMatches(items) {
    items.forEach(function(item) {
        var searchVal = $('#searchInput').val();
        var body = item.body;
        var title = item.title;
        var keywords = item.keywords;
        if(body.includes(searchVal) || title.includes(searchVal) || keywords.includes(searchVal)) {
            console.log(item);
        };
    })
}

function log(items) {
    console.log(items);
};

var starredItems = [];
