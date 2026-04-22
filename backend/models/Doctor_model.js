const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const doctorSchema = new mongoose.Schema(
  {
    dr_name: {
      type: String,
      required: [true, 'Doctor name is required'],
      trim: true,
    },

    dr_degree: {
      type: String,
      required: [true, 'Degree is required'],
      trim: true,
    },

    dr_email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
    },

    dr_mobile_number: {
      type: String,
      required: [true, 'Mobile number is required'],
      match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit mobile number'],
    },

    dr_city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
    },

    dr_address: {
      type: String,
      required: [true, 'Address is required'],
      trim: true,
    },

    dr_password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
      select: false, // hides password in queries
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Doctor', doctorSchema);


