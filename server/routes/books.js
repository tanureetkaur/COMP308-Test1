// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {
    res.render('books/details', {
      title: "Add  Book",
      books: ''
    })
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

  //creating a new book object
    let myBook = new book({
      "Title": req.body.title,
      "Genre": req.body.genre,
      "Price": req.body.price,
      "Author": req.body.author
    });

    //adding book to the database
    book.create(myBook, (err,myBook)=>{
      if(err){
        res.end(err);
      }else{
        res.redirect("/books");
      }
    })

});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

    let id = req.params.id;

    //finding a book in the databnase
    book.findById(id, (err, myBook)=>{
      if(err){
        res.end(err);
      }
      else{
        res.render("books/details",{
          title: "Update Book",
          books : myBook
        })
      }
    })
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

    let id = req.params.id;

    let myBook = book({
      "_id" : id,
      "Title": req.body.title,
      "Genre": req.body.genre,
      "Price": req.body.price,
      "Author": req.body.author
    });

    //updating a book database
    book.update({_id:id}, myBook, (err, myBook) =>{
      if(err){
        res.render(err);
      }
      else{
        res.redirect("/books");
      }
    });

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

      let id = req.params.id;

      //removing a bopok from database
      book.remove({_id:id}, (err, myBook)=>{
        if(err){
          res.end(err);
        }
        else{
          res.redirect("/books");
        }
      })

    });


module.exports = router;
