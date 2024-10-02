const express = require("express");
const { GetByBookName, GetByPriceRange, GetByAllfields, postbook } = require("../Controllers/BookController");
const BookRouter = express.Router();

BookRouter.get("/FindBooks" , GetByBookName);
BookRouter.get("/PriceRange", GetByPriceRange);
BookRouter.post("/", postbook);
BookRouter.get("/Search", GetByAllfields);


module.exports= {BookRouter}