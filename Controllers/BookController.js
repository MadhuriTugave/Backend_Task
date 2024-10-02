const { Books, Bookcollectoin } = require("../Modules/Books");


const GetByBookName  = async (req , res)=>{
    console.log(req.query.name)
    try {
        const BookName = req.query.name;
        // console.log(Books)
        const FindBooks = await Bookcollectoin.find({BookName});

        console.log(FindBooks)
        if (FindBooks.length > 0) {
            res.json(FindBooks);
          } else {
            res.status(404).json({ message: 'No books found with that name' });
          }
        
    } catch (error) {
      res.json({status:500})  
    }

}
const GetByPriceRange  = async (req , res)=>{
    const { minPrice, maxPrice } = req.query;

    // console.log(minPrice, maxPrice)
    if (!minPrice || !maxPrice) {
        return res.status(400).json({ message: 'Please provide both minPrice and maxPrice' });
    }
    try {
        
        const min = parseFloat(minPrice);
        const max = parseFloat(maxPrice);

      
        if (isNaN(min) || isNaN(max)  || min > max) {
            return res.status(400).json({ message: 'Invalid price range' });
        }

      
        const booksInRange = await Bookcollectoin.find({
            Rent_Per_day: { $gte: min, $lte: max }
        });
// console.log(booksInRange)
        if (booksInRange.length > 0) {
            res.json(booksInRange); 
        } else {
            res.status(404).json({ message: 'No books found in this price range' });
        }
    } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error', error });
        }

}
const GetByAllfields  = async (req , res)=>{
    const { category, name, minPrice, maxPrice } = req.query;

    // Build the query object
    const query = {};

  
    if (category) {
        query.Category = category; // Match the category
    }
    
    if (name) {
        query.BookName = { $regex: name, $options: 'i' }; 
    }

    // Add rent per day range if provided
    if (minPrice || maxPrice) {
        query.Rent_Per_day = {};
        if (minPrice) {
            query.Rent_Per_day.$gte = parseFloat(minPrice);
        }
        if (maxPrice) {
            query.Rent_Per_day.$lte = parseFloat(maxPrice); 
        }
    }

    try {
      
        const books = await Bookcollectoin.find(query);

        if (books.length > 0) {
            res.json(books); 
        } else {
            res.status(404).json({ message: 'No books found matching the criteria' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }




}
const postbook = async (req,res)=>{
    const { name, category, rentPerDay } = req.body;
    console.log(name, category, rentPerDay)
    try {
        // Create a new book document
        const newBook = new Bookcollectoin({
            BookName: name,
            Category: category,
            Rent_Per_day: rentPerDay,
        });
console.log(newBook)
        // Save the new book to the database
        const savedBook = await newBook.save();
        
        // Respond with the saved book
        res.status(201).json(savedBook);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to add the book', error });
    }
}
module.exports = {GetByBookName,GetByAllfields, GetByPriceRange, postbook}
