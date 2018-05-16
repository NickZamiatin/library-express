const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3003;
const booksPath = path.join(__dirname, 'data', 'books.json');
const bookRoutes = require('./routes/books');

app.use(morgan('dev'));
app.use(express.json());

app.use('/books', bookRoutes);

app.get('/', (request, response) => {
  response.send('Welcome to the Library Express application.');
});

app.listen( PORT, () => {
  console.log(`library-express: Application listening on port no. ${PORT}...`);
});
