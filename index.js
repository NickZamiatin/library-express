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
app.get('/books/:id', (request, response) => {
  // Read JSON file
  fs.readFile(booksPath, 'utf-8', (error, booksJSON) => {
    // Error handling
    if (error) {
      console.error(error);
      return response.sendStatus(500);
    }
    // Parse the JSON file and store into array
    const books = JSON.parse(booksJSON);
    // Find the array item (book object) that matches :id, and store it.
    // In other words find book.ISBN === request.params.id
    const matchingBook = books.find( book => book.ISBN === request.params.id );
    // Respond with that item
    response.send(matchingBook);
  });
});

// create
app.post('/books', (request, response) => {});

// update
app.put('/books/:id', (request, response) => {
  // Read JSON file
  fs.readFile(booksPath, 'utf-8', (readError, booksJSON) => {
    // Error handling
    if (readError) {
      console.error(readError);
      return response.sendStatus(500);
    }
    // Parse JSON file and store in array
    const books = JSON.parse(booksJSON);
    const newBook = {
      ISBN: request.body.ISBN,
      title: request.body.title,
      author: request.body.author,
      price: parseFloat(request.body.price)
    };
    // Find the array item that matches :id, store the item, and update the array.
    const updatedBooks = books.map( book => {
      if (book.ISBN === request.params.id) {
        return newBook;
      } else {
        return book;
      }
    });
    // Convert the array to JSON (stringify)
    const updatedBooksJSON = JSON.stringify(updatedBooks);
    // Write the JSON back to the file
    fs.writeFile(booksPath, updatedBooksJSON, (writeError) => {
      // Error handling
      if (writeError) {
        console.error(writeError);
        return response.sendStatus(500);
      }
      // Respond with stored item.
      response.send(newBook);
    });
  });
});

// destroy
app.delete('/books/:id', (request, response) => {});

app.listen( PORT, () => {
  console.log(`library-express: Application listening on port no. ${PORT}...`);
});
