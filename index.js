const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// * Please DO NOT INCLUDE the private app access token in your repo. Don't do this practicum in your normal account.
const PRIVATE_APP_KEY = 'pat-eu1-8e05ce55-e5bd-4e54-95f3-b88046f784f1';

const headers = {
    Authorization: `Bearer ${PRIVATE_APP_KEY}`,
    'Content-Type': 'application/json',
}

// TODO: ROUTE 1 - Create a new app.get route for the homepage to call your custom object data. Pass this data along to the front-end and create a new pug template in the views folder.

// * Code for Route 1 goes here
const objectType = "2-128412340";
const baseURL = `https://api.hubspot.com/crm/v3/objects/${objectType}`;
const properties = "book_author,book_genre,book_issn,book_title";

app.get('/', async (req, res) => {
    const favoriteBooks = `${baseURL}?properties=${properties}`
    try {
        const response = await axios.get(favoriteBooks, { headers });
        const data = response.data.results;
        res.render('homepage', { title: 'Favorite Book(s)', data });
    } catch (error) {
        console.error(error);
    }

});

    

// TODO: ROUTE 2 - Create a new app.get route for the form to create or update new custom object data. Send this data along in the next route.

app.get('/update-cobj', async (req, res) => {
    const pageTitle = "Update Custom Object Form | Integrating With HubSpot I Practicum";
    const favoriteBooks = `${baseURL}${objectId}?properties=${properties}`;
    const objectId = '144528506';

    try {
        const response = await axios.get(favoriteBooks, { headers });
        const data = response.data;

        res.render('updates', { pageTitle: pageTitle,
            book_author: data.properties.book_author, 
            book_issn: data.properties.book_issn,
            book_genre: data.properties.book_genre,
            book_title: data.properties.book_title
         });
    } catch (error) {
        console.error(error);
    }

});


// * Code for Route 2 goes here

// TODO: ROUTE 3 - Create a new app.post route for the custom objects form to create or update your custom object data. Once executed, redirect the user to the homepage.

// * Code for Route 3 goes here








// * Localhost
app.listen(3000, () => console.log('Listening on http://localhost:3000'));