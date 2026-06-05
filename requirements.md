# Task:  TMDB kinopoisk
1.[Assignment requirements on YouTube Video](https://www.youtube.com/watch?v=kcUO-wzskMc)
2. Screenshots:
   <img width="1440" alt="main" src="https://github.com/user-attachments/assets/5f76deff-b5a6-4a35-bfb3-a1622cd26e16">
   <img width="652" alt="test" src="https://github.com/user-attachments/assets/1b7e8ea0-cc4f-4564-8901-4ea602170cb0">
3. [Deploy](https://tmdb-cinemascope.vercel.app/)
4. [Link to repo](https://github.com/Intrstng/TMDB-kinopoisk/tree/develop)
5. Branch: **develop**
6. Done 05.06.2026
7. Task completion percentage: 100% (full complete of all tasks)

## Technical requirements

### Stack required to complete the technical task:
* React
* Typescript
* Redux toolkit (query / slice)
* React Router
* App styling: CSS modules
* Material UI is permitted for this test task.
* ❗ Responsive layout and attractive design will be a plus, but these aspects are optional and will not be factored into the final grade.

### Documentation
[TMDB API docs](https://developer.themoviedb.org/docs/getting-started)


### Functional requirements
#### 1. Header 🍿
* 1.1 **Logo Display** the TMDB logo on the left; clicking on it will take the user back to the main page.
* 1.2  **Menu** The menu should have 5 pages:
  * Main — home page
  * Category Movies — page with a selection of different categories
  * Filtered Movies — page where you can filter and sort movies by various criteria
  * Search — page for searching movies by title
  * Favorites — featured/favorite movies
* 1.3 **Switching the theme**
  * A button that switches the theme (dark/light) when pressed.

####  2. Main Page 🍿
* 2.1 **Welcome Section**
  * In the first block, randomly display a large cover *(backdrop_path)* from the popular movie category in the background
  * Implement a movie search. Enter a movie title, click the Search button, and you'll be redirected to the Search page, where the query is submitted and the resulting movies are displayed.

  ❗ If the field is empty, disable the Search button

* 2.2 **Popular Movies** - Implement a block that will load popular films
  * Display the title **"Popular Movies"**
  * Show 6 movie cards
  * Add a *"View More"* button that, when clicked, should take the user to the **Category Movies** page and display all the popular movies.

* 2.3. **Top Rated, Upcoming, Now Playing Movies**
  Similar to the **Popular Movies** block, add three more blocks below that look the same but display their own movie categories:
  -   [🔗 Top Rated](https://developer.themoviedb.org/reference/movie-top-rated-list)
  -   [🔗 Upcoming](https://developer.themoviedb.org/reference/movie-upcoming-list)
  -   [🔗 Now Playing](https://developer.themoviedb.org/reference/movie-now-playing-list)

#### 3. Film card 🍿
##### The film card must contain:
* Movie poster
* Movie title
* Rating (with a visual indicator, such as a colored badge)
* **"❤️ Favorite"** button for adding to favorites
* Clicking on a movie should redirect the user to a separate page with detailed information about the movie.


❗ If the movie doesn't have a poster, you'll need to create a placeholder. You can use [Placehold](https://placehold.co/) or add a default image yourself.

#### 4. Footer 🍿
##### At the bottom of the site, display the Footer, which should be displayed on all pages.
* In the footer, display general information about the site: `© 2026 Kinopoisk Demo · Data courtesy of TMDB.`
* The **Footer** must be attached to the bottom of the page, i.e. if there is no content on the page, it should not be in the middle of the screen.

You can also add your social media links to contact you (GitHub, LinkedIn, Telegram, Instagram)

#### 5. Movies Category Page
**Movies Category Page** – a page with a selection of different categories, accessible by clicking View More on the main page. Clicking the menu defaults to the Popular Movies category.

At the top of this page there should be 4 buttons that when clicked the user will see different categories (**Popular** / **Top Rated** / **Upcoming** / **Now Playing**).

* Below the buttons there should be a title for the movie category that is currently selected.
* When you click the button, the URL should change. This means that if you click the **Top Rated** button and then refresh the page, you should remain in the **Top Rated** category.
* The active page button should be visually highlighted so that the user can see what is currently selected.
* Pagination or infinite scrolling should be implemented at the bottom (optional)

#### 6. Filtered Movies Page 🍿

**Filtered Movies Page** - a page where you can filter and sort movies by various criteria
* 6.1 **Sorting/filtering section**
On the left, you need to display a block in which there will be filtering and sorting

[🔗 Discover Movie — docs](https://developer.themoviedb.org/reference/discover-movie)

❗ Sorting and filtering should work together. So, if you select the **Comedy** genre, have a rating greater than 7, and sort by popularity, that's the result you should see.
*  6.1.1. Sorting (sort_by)
    - By Popularity (Descending)
    - By Popularity (Ascending)
    - By Rating (Descending)
    - By Rating (Ascending)
    - By Release Date (Descending)
    - By Release Date (Ascending)
    - By Title (A-Z)
    - By Title (Z-A)

* 6.1.2. Filter by rating (vote_average.gte / vote_average.lte)
    - Show movies with ratings from 0 to 10 in 0.1 increments.
    - Implement a debounce with a 200ms delay to prevent 100 requests from being lost when the slider moves.

* 6.1.3. Filter by genre (with_genres)

  [🔗 Genres — docs](https://developer.themoviedb.org/reference/genre-movie-list)

    - Draw buttons with movie genres that, when clicked, should filter the movies
    - You can filter movies by several genres at the same time, that is, you can select several genres at the same time

* 6.1.4 Reset filters
  Implement a filter reset button that, when clicked, resets sorting and genres to their original state.

* 6.2 Results section
    - On the right, draw a block of movie cards, sorted and filtered.
    - Pagination or infinite scrolling (optional) should be implemented at the bottom.

#### 7. Search Page 🍿
**Search Page** — a page for searching movies by title
- Enter the name of the movie, click the **Search** button and you should see the cards of movies that match the entered name.
- If you haven't entered a movie title, you should see a message indicating this. For example: *"Enter a movie title to start searching"*
- If a movie with that title doesn't exist, you should see a message stating that. For example: *"No matches found for "www"\"*
-   When you click on the cross `<input type="search">`, the result should reset to its original state
- Pagination or infinite scrolling should be implemented at the bottom (optional)

#### 8. Favorites Page 🍿
**Favorites Page** — featured/favorite films
When you click the **"❤️ Favorites"** button in the movie card, the movie should be saved to *localStorage*. Clicking the **"❤️ Favorites"** button in the movie card again should remove the movie from *localStorage* (store *id*, *title*, *posterUrl*, and *voteAverage* in *localStorage*).

On the **Favorites Page** you should see cards of the movies you've added to your favorites.

#### 9. Movie Details Page 🍿
When you click on a movie, you should be redirected to a separate page with the movie, where you will see extended information about the movie.
* 9.1 **Section 1**: Information about the film

- Movie poster (larger than the movie card)
- Movie title
- Release year
- Rating
- Genres
- Duration
- Movie description

    * 9.2 **Section 2**: Actors (starring)

[🔗 Movie Credits — docs](https://developer.themoviedb.org/reference/movie-credits)

Show the top 6 actors with photos, real names, and the names of the characters they play.

❗ If an actor doesn't have a photo, you'll need to draw a placeholder. You can use the service [Placehold](https://placehold.co/) or add a default image yourself.

* 9.3 **Section 3**: Similar films

[🔗 Similar Movie — docs](https://developer.themoviedb.org/reference/movie-similar)

Show at least 6 cards with similar films

* 9.4 **Section 4**: Back button

Implement a "Back" button that should return the user to the previous page.

#### 10. Dark / Light Theme 🍿
The theme switch button should be in the **Header**. Clicking it will allow you to choose between dark and light themes.
* Be sure to save the theme in *localStorage*
* The theme should apply to all pages of the application.

#### 11. Error Handling 🍿
Implement error handling in your app.

❗ For error output, you can use [React Toastify](https://www.npmjs.com/package/react-toastify) or, if you are using **MUI**,  [React Snackbar](https://mui.com/material-ui/react-snackbar/#use-with-alerts)

* 11.1 Global Error
  Handle at least the following types of errors:
    - *Network error*. To test, disable the *network* and try searching for a movie on the search page.
    - Invalid *AUTH_TOKEN*. To test, add a letter to *AUTH_TOKEN*.
    - *Error 404*. To test, change the endpoint, for example like this: `url: /movie123/${category}`

* 11.1 Zod Error
  Add server response validation to all endpoints.

#### 12. Loaders 🍿

* 12.1 Linear Progress
  When loading data, navigating through pages, changing pagination, filtering/sorting, searching, etc., you should see **Linear Progress**.

❗ To implement Linear Progress, you can use a component [Linear Progress](https://mui.com/material-ui/react-progress/#linear) from **MUI**

* 12.1 Skeletons
  Implement skeletons on all pages except the **Favorites Page**, since this page loads data from *localStorage*

❗ To implement skeletons, you can use [React Loading Skeleton](https://www.npmjs.com/package/react-loading-skeleton) or, if you are using MUI, [React Skeleton](https://mui.com/material-ui/react-skeleton/)

#### 13. 404 Page 🍿
Implement a *404 page* for non-existent routes.

#### 14. Vercel 🍿
Deploy the finished app to **Vercel**. If you haven't done this before, it's up to you to figure it out.

❗ Be sure to attach the token you received during registration in the [Settings / Environment Variables](https://vercel.com/valerys-projects-749c1423/tmdb-kinopoisk/settings/environment-variables) section.
