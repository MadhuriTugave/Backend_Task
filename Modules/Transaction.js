const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
 
  userId: {
    type: mongoose.Schema.Types.String,
    required: true,
    ref: 'User' 
  },
  bookId: {
    type: mongoose.Schema.Types.String,
    required: true,
    ref: 'Book' 
  },
  transactionType: {
    type: String,
    enum: ['issue', 'return'],
    required: true
  },
  issueDate: {
    type: Date,
    required: function() {
      return this.transactionType === 'issue';
    }
  },
  returnDate: {
    type: Date,
    required: function() {
      return this.transactionType === 'return';
    }
  },

  totalRent: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;