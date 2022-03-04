// import mongoose from 'mongoose';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      lowercase: true,
      required: true,
      unique: [true, 'email already registered']
    },
    firstName: {
      type: String,
      lowercase: true,
      // required: true
    },
    lastName: {
      type: String,
      lowercase: true,
      // required: true,
    },
    profilePhoto: {
      type: String,
      required: true
    },
    // spotlight: {
    //   type: Boolean,
    //   enum: ['land', 'house', 'office'],
    //   lowercase: true,
    //   required: true
    // },
    passsword: {
      type: String,
    },
    source: {
      type: String,
      required: [true, 'source not specified']
    },
    lastVisited: {
      type: Date,
      default: new Date()
    },
    // createdAt: {
    //   type: Date,
    //   immutable: true
    //   // required: true,
    // },
    // updatedAt: {
    //   type: Date
    // },
  },
  {
    collection: 'users',
    timestamps: true
  }
)


// userSchema.index({ slug: 1, userid: 1 }, { unique: true })

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
