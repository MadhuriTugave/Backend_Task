const express = require("express");
const { BookIsIssued, ReturnBook } = require("../Controllers/TransactionController");
const TransactionRoute = express.Router();

TransactionRoute.post("/",BookIsIssued);
TransactionRoute.post("/return-book",ReturnBook);


module.exports = TransactionRoute;
