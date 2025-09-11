const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
    trim: true
  },
  branch: {
    type: String,
    required: true,
    trim: true
  },
  year: {
    type: Number,
    required: true,
    min: 1
  },
  img: {
    type: Buffer,
    required: false
  },
  mobileNumber: {
    type: String, 
    required: true,
    match: /^[0-9]{10}$/
  },
  email:{type:String},
  amountPaid: {
    type: Number,
    required: true,
    min: 0
  }
}, { timestamps: true });

// Create the model
const registered = mongoose.model('registered', studentSchema);
const intrested =mongoose.model('intrested',studentSchema)
module.exports ={registered,intrested};
