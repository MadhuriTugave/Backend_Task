
const UserCollection = require("../Modules/Users");
const Transaction = require("../Modules/Transaction");
const { Bookcollectoin } = require("../Modules/Books");

const BookIsIssued  = async (req , res)=>{
    // console.log(req.body)
    const {name , Book , issueDate,returnDate} = req.body;
  try {
      const book = await Bookcollectoin.findOne({BookName :Book})
      const user = await UserCollection.findOne({Name : name}) ;
  
  
  //   console.log(user , book)
  
    if (!user || !book) {
      throw new Error('User or Book not found.');
    }
  
    const transaction = new Transaction({
  
      userId: user._id, 
      bookId: book._id, 
      transactionType: 'issue',
      returnDate,
      issueDate,
      totalRent: 0
    });
    await transaction.save();
    // console.log('Book issued successfully:', transaction);
    res.json({
        status:201,
        message:"Book issued successfully!!!"
    })
  } catch (error) {
    throw new Error(error);
  }

 


}

// Function to calculate rent based on issue and return dates
const calculateRent = (issueDate, returnDate, rentPerDay) => {
    const issuedDays = Math.ceil((returnDate - issueDate) / (1000 * 60 * 60 * 24)); // Calculate number of days
    return issuedDays * rentPerDay;
  };
  

const ReturnBook =  async (req, res) => {
    const { userId, bookName, returnDate } = req.body;
  
    if (!userId || !bookName || !returnDate) {
      return res.status(400).json({ message: 'userId, bookName, and returnDate are required.' });
    }
  
    try {
      // Find the book by name
      const book = await Bookcollectoin.findOne({ BookName: bookName}); // Case-insensitive search
      if (!book) {
        return res.status(404).json({ message: 'Book not found.' });
      }
  
      // Find the transaction where the book is issued and not yet returned
      const transaction = await Transaction.findOne({
        userId,
        bookId: book._id,
        transactionType: 'Returned',
        returnDate: null
      });
  
      if (!transaction) {
        return res.status(404).json({ message: 'Transaction not found or the book is already returned.' });
      }
  
      // Calculate the rent
      const returnDateObj = new Date(returnDate);
      const issueDate = new Date(transaction.issueDate);
      const rentPerDay = book.Rent_Per_day;
      const totalRent = calculateRent(issueDate, returnDateObj, rentPerDay);
  
      // Update the transaction with the return date and total rent
      transaction.returnDate = returnDateObj;
      transaction.totalRent = totalRent;
      await transaction.save();
  
      res.status(200).json({
        message: 'Book returned successfully.',
        totalRent,
        transaction
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };

module.exports ={BookIsIssued, ReturnBook}