const express = require('express');
const axios = require('axios');
const app = express();
const path = require('path');

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('views', path.join(__dirname, 'views'));

// * Please DO NOT INCLUDE the private app access token in your repo. Don't do this practicum in your normal account.


// TODO: ROUTE 1 - Create a new app.get route for the homepage to call your custom object data. Pass this data along to the front-end and create a new pug template in the views folder.

// * Code for Route 1 goes here
app.get('/', async (req, res) => {
const favoriteBooks = 'https://api.hubspot.com/crm/v3/objects/2-128412340?properties=book_author,book_genre,book_issn,book_title';
  const headers = {
    Authorization: `Bearer ${process.env.PRIVATE_APP_ACCESS}`,
    'Content-Type': 'application/json'
  }
  const params = {
    properties: ['book_author', 'book_genre', 'book_issn', 'book_title'] 
  }
  try {
    const response = await axios.get(favoriteBooks, { headers, params });
    console.log('API Response:', JSON.stringify(response.data, null, 2));
    const favorite_books = response.data.results;
    console.log('Favorite Books:', JSON.stringify(favorite_books, null, 2));
    res.render('homepage', { favorite_books: favorite_books });
  } catch (error) {
    console.error(error);
  }
})


// TODO: ROUTE 2 - Create a new app.get route for the form to create or update new custom object data. Send this data along in the next route.

// * Code for Route 2 goes here
app.get('/update-cobj', (req, res) => {
    try {
        res.render('updates', { pageTitle: 'Update Custom Object Form | Integrating With HubSpot I Practicum' });
    } catch (e) {
        console.error(e);
    }
});


// TODO: ROUTE 3 - Create a new app.post route for the custom objects form to create or update your custom object data. Once executed, redirect the user to the homepage.

// * Code for Route 3 goes here
app.post('/update-cobj', async (req, res) => {
    const favoriteBooks = 'https://api.hubspot.com/crm/v3/objects/2-128412340';
    const headers = {
      Authorization: `Bearer ${process.env.PRIVATE_APP_ACCESS}`,
      'Content-Type': 'application/json'
    }
    const data = {
      properties: {
                book_author: req.body.book_author,
                book_title: req.body.book_title,
                book_issn: req.body.book_issn,
                book_genre: req.body.book_genre
            }
      }
    
    try {
      const response = await axios.post(favoriteBooks, data, { headers });
      console.log('API Response:', JSON.stringify(response.data, null, 2));
      res.redirect('/'); 
    } catch (error) {
      console.error(error);
    }
  });




// * Localhost
app.listen(3000, () => console.log('Listening on http://localhost:3000'));