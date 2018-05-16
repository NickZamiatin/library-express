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
app.post('/books', (request, response) => {
  // Read JSON file
  fs.readFile(booksPath, 'utf-8', (readError, booksJSON) => {
    // Error handling
    if (readError) {
      console.error(readError);
      return response.sendStatus(500);
    }
    // Parse JSON file and store in an array
    const books = JSON.parse(booksJSON);
    // Push new data as book object into array
    const newBook = {
      ISBN: request.body.ISBN,
      title: request.body.title,
      author: request.body.author,
      price: parseFloat(request.body.price)
    };
    books.push( newBook );
    // Stringify updated array to json
    updatedBooksJSON = JSON.stringify(books);
    // Write JSON back to the file
    fs.writeFile(booksPath, updatedBooksJSON, (writeError) => {
      // Error handling
      if (writeError) {
        console.error(writeError);
        return response.sendStatus(500);
      }
      // Respond with new data (book object)
      response.send( newBook );
    });
  });
});

// update
app.put('/books/:id', (request, response) => {
  let newBook;
  // Read JSON file
  fs.readFile(booksPath, 'utf-8', (readError, booksJSON) => {
    // Error handling
    if (readError) {
      console.error(readError);
      return response.sendStatus(500);
    }
    // Parse JSON file and store in array
    const books = JSON.parse(booksJSON);
    // Find the array item that matches :id, store the item, and update the array.
    const updatedBooks = books.map( book => {
      if (book.ISBN === request.params.id) {
        newBook = {
          ISBN: book.ISBN,
          title: request.body.title || book.title,
          author: request.body.author || book.author,
          price: parseFloat(request.body.price) || book.price
        };
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
app.delete('/books/:id', (request, response) => {
  let matchingBook;
  // Read JSON file
  fs.readFile(booksPath, 'utf-8', (readError, booksJSON) => {
    // Error handling
    if (readError) {
      console.error(readError);
      return response.sendStatus(500);
    }
    // parse JSON file and store into an array
    const books = JSON.parse(booksJSON);
    // Remove item from array that matches :id, store it in an object
    const remainingBooks = books.filter( book => {
      if ( book.ISBN === request.params.id ) {
        matchingBook = book;
        return false;
      } else {
        return true;
      }
    });
    // Convert smaller array to JSON (stringify)
    const remainingBooksJSON = JSON.stringify(remainingBooks);
    // Write JSON back to file
    fs.writeFile(booksPath, remainingBooksJSON, (writeError) => {
      // Error handling
      if (writeError) {
        console.error(writeError);
        return response.sendStatus(500);
      }
      // Respond with stored, deleted object
      response.send(matchingBook);
    });
  });
});

app.listen( PORT, () => {
  console.log(`library-express: Application listening on port no. ${PORT}...`);
});
