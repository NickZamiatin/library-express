const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3003;

app.use(morgan('dev'));
app.use(express.json());

app.get('/', (request, response) => {
  response.send('Welcome to the Library Express application.');
});

app.listen( PORT, () => {
  console.log(`library-express: Application listening on port no. ${PORT}...`);
});
