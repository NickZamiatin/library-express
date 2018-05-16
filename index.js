const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3003;
const booksPath = path.join(__dirname, 'books.json');

app.use(morgan('dev'));
app.use(express.json());

app.get('/', (request, response) => {
  response.send('Welcome to the Library Express application.');
});

// index
app.get('/books', (request, response) => {
  // Read JSON file
  fs.readFile(booksPath, 'utf-8', (error, booksJSON) => {
    // Error handling
    if (error) {
      console.error(error);
      return response.sendStatus(500);
    }
    // Parse JSON file and store the resulting array
    const books = JSON.parse(booksJSON);
    // Respond with that array
    response.send(books);
  });
});

// show
app.get('/books/:id', (request, response) => {});

// create
app.post('/books', (request, response) => {});

// update
app.put('/books/:id', (request, response) => {});

// destroy
app.delete('/books/:id', (request, response) => {});

app.listen( PORT, () => {
  console.log(`library-express: Application listening on port no. ${PORT}...`);
});
