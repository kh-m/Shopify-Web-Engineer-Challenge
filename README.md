### Toronto Waste Lookup

# <img display="inline" top="10" width="35" src="/readme_images/iu.png"> Shopify Web Engineer Challenge - Summer 2019

<p align="center">
<img align="left" src="/readme_images/toronto.svg" height="120"> <img align="center" src="/readme_images/search.svg" width="110"> <img align="right" src="/readme_images/bin.svg" width="120">
</p>

<br>

## Description
* Website that provides user guidance with how to dispose of waste in Toronto
* Displays search results from Toronto Waste Disposal's API, using item keywords
* Items can be 'favorited' by clicking on its corresponding star
  * which would also add it render it to the 'favorites' list below the search results where it would remain as user searches for other types of trash, unless:
    * 'unfavorited' by clicking on its corresponding green star
    * page is refreshed by routing to root route   
<br>

## Process

When tackling this challenge, I contemplated a few methods to achieve the requirements provided; mostly for how to handle the data and storing it. In the end, I built it with the following:
* Node.js
* Express.js
* Mongoose
* jQuery
* Axios

### Back-end
<p>I wrote the back-end using Express.js in Node.js. The back-end in this web app is arguably redundant or 'overkill'.
When the user loads the root homepage route, a function is called to 'seed' the Mongoose database; it empties it, makes an API call (from back-end using Axios) to the Toronto Waste Disposal API, loops through each item (that has a title) and saves its title, body a default favorite value of 'false' and a unique ID from Mongoose. When the user 'favorites' and 'unfavorites' and item, the data in the back-end is updated as such. Refreshing the homepage/root route seeds the database again.</p>
<p>A version of this could have been possible without the need of a Mongoose database, with simply saving the data on the user's browser in an array in the front-end application. However, the method used allows for an easier upgrade for a platform with data persistence, where perhaps a user can save their favorites to their user account by logging in.</p>
<p>A drawback with using a database the way it is currently being implemented is that it does not allow for multiple users to be using the website simultaneously; at least in terms of adding and removing 'favorites'. This would lead to different users modifying the same single 'favorites' list. But as this is web app is created for demonstration purposes only, with minimal expected traffic, I chose to keep it the way it is to demonstrate the use of Mongoose and data persistence.</p>

### Design/UI
Design specifications for the website are provided simply as screenshot image file, with not much technical requirements other than the functionality of the buttons. For the gradient, I sampled a colour from each side (left and right) and created a linear gradient based off of that. For the rest of the website, I simply styled it with trial and error, until I got a result that was close enough to the image.


### Hosting


# Challenge details from Shopify

>
> Build a web app to search for waste items using the Toronto Waste Wizard database, and save frequently used ones.
>
> ### Instructions
> - [x] Reproduce the design as provided in the screenshot, which displays example search results.
> - [x] The data must be taken from the [Waste Wizard Lookup data (JSON)](https://www.toronto.ca/city-government/data-research-maps/open-data/open-data-catalogue/#5ed40494-a290-7807-d5da-09ab6a56fca2).
> - [x] Typing in the search field should *NOT* perform an API call.
> - [x] A search must be performed when hitting enter or clicking the search button.
> - [x] When the search input field is cleared, the list of results should also be cleared. 
> - Performing a search should render a list of potential matching items based on keywords. Each item should:
>    - [x] Render the title and description of the item.
>    - [x] Render a grey star button *if the item is not already favourited*.
>    - [x] Render a green star icon *if the item is not already favourited*.
>    - [x] Clicking the star button should add the item to the favourites list.
> - When the number of favourites is more than one, the app should render a list of items. Each saved item should:
>    - [x] Render the title and description of the item.
>    - [x] Render a green star button *if the item has been favourited*.
>    - [x] Clicking the green star button should remove the item from the saved list.
> 
> ### Design
> 
> ![Design](http://cdn.shopify.com/static/web-eng-challenge-summer-2019/design.png)
> 
> ### Submission
> 
> In your application, please include: 
> 
> - [x] A link to your codebase, for review.
> - [x] A link to a hosted version, for testing.
> 


<div>Icons made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>