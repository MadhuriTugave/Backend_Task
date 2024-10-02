// import express from "express";
const express = require("express");
const DBConnection = require("./DB");
const { BookRouter } = require("./Routes/BookRoutes");
const TransactionRoute = require("./Routes/Transaction");
const app = express();
app.use(express.json());

DBConnection();
port = process.env.PORT ||  3000;



app.get("/",(req,res)=>{
    res.json("Server Started");
})

app.use("/Books", BookRouter);
app.use("/Transaction", TransactionRoute);


app.listen(port ,()=>{
console.log(`server is lisining on ${port}`)
});
