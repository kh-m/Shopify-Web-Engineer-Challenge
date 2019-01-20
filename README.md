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

## Running the code
Clone (or download) the repository
```javascript
$ git clone https://github.com/kh-m/Shopify-Web-Engineer-Challenge.git
```

Install the dependencies in package.json:
```javascript
$ npm install
```

With MongoDB installed locally, run the MongoDB server (do not close):
```javascript
$ mongod
```
Run the starter app with node:
```javascript
$ npm start
```
View the web app locally at:
```javascript
http://localhost:8000
```


## Process

When tackling this challenge, I contemplated a few methods to achieve the requirements provided; mostly for how to handle the data and storing it. I chose to build is using the following frameworks/libraries:
* Node.js
* Express.js
* Mongoose
* jQuery
* Axios

### Back-end
<p>I wrote the back-end using Express.js in Node.js. The back-end in this web app is arguably redundant or 'overkill'.
When the user loads the root homepage route, a function is called to 'seed' the Mongoose database; it empties it, makes an API call (from back-end using Axios) to the Toronto Waste Disposal API, loops through each item (that has a title) and saves its title, body, keywords, a favorite value default of 'false' and a unique ID from Mongoose. When the user 'favorites'/'unfavorites' an item, the data in the back-end is updated as such. Refreshing the homepage/root route reseeds the database, clearing and 'favorites'.</p>
<p>A version of this could have been possible without the need of a Mongoose database, by simply saving the data on the user's browser in an array in the front-end application. However, the method I used allows for an easier upgrade for a platform with data persistence, where perhaps a user can save their favorites to their user account by logging in.</p>
<p>A drawback with how the database is currently being implemented is that it does not allow for multiple users to be using the website simultaneously; at least in terms of adding and removing 'favorites'. This would lead to different users modifying the same single 'favorites' list. But as this is web app is created for demonstration purposes only, with minimal expected traffic, I chose to keep it the way it is to demonstrate the use of Mongoose and data persistence.</p>
<p>Though there are not many routes for this single-page web app, it does follow RESTful routing practices. Its JSON API can be viewed at /api/waste, and it performs PUT requests to the same route to update it.</p>

### Front-end
<p>jQuery is used in the front-end to handle the data from the back-end API. It sorts through the data to find matches based on the item's keywords, as there is always 'over-fetching' of data when calling the API. It would then create li's in the search results, and li's in the favorites list if an item is 'favorited'.</p>

*NOTE: Though the challenges requires that the search result matches are based on the item's **keywords**, the provided search example in screenshot suggests that the search is also looking for matches in the **title**. In my view, it makes more sense to also include the title and body (testing with such appeared to produce more relevant results), but I decided to have it only search for matches in keywords, as it was explicitly stated in the challenge requirements.*

<p>Toggling a 'favorite' item makes an AJAX PUT request to the back-end API. I also used the front-end to fix the syntax of an element's body and have all links open on a new blank page, by using the .replace() method</p>

### Design/UI
Design specifications for the website are provided simply as screenshot image file, with not much technical requirements other than the functionality of the buttons. For the gradient, I sampled a colour from each side (left and right) and created a linear gradient based off of that. For the rest of the website, I simply styled it with trial and error, until I got a result that was close enough to the image.


### Hosting
<p>The web app is hosted on <a href="http://heroku.com">Heroku</a>, and the Mongoose database on <a href="http://mLab.com">mLab</a>. In order to keep the database details secure, it is referenced in the code with a variable in the Heroku environment.</p>

## <a href="https://toronto-waste-disposal.herokuapp.com">Click here to view the hosted version.<a>

<br>
<hr>

## Challenge details from Shopify

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