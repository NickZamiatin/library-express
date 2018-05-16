
const bookModel = require('../models/book');

const index = (request, response) => {
  const books = bookModel.index();
  response.send(books);
}

const show = (request, response) => {}
const create = (request, response) => {}
const update = (request, response) => {}
const destroy = (request, response) => {}

module.exports = {
  index,
  show,
  create,
  update,
  destroy
}
