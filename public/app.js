// jQuery will perform these once page has loaded
$(document).ready(function() {
    // listens to 'enter' in input field
    $('#searchInput').keypress(function(event) {
        if(event.which == 13) {
            console.log("Pressed enter");
        }
    });

    // listens to 'click' on search button
    $('#searchButton').click(function() {
        console.log("Clicked search button");
    });
});

var starredItems = [];