// import mongoose from 'mongoose';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const estateSchema = new Schema(
  {
    title: {
      type: String,
      lowercase: true,
      required: true
    },
    description: {
      type: String,
      lowercase: true,
      // required: true
    },
    location: {
      type: String,
      lowercase: true,
      required: true,
    },
    type: {
      type: String,
      enum: ['land', 'house', 'office'],
      lowercase: true,
      required: true
    },
    featured: {
      type: Boolean,
      lowercase: true,
      default: false
    },
    // spotlight: {
    //   type: Boolean,
    //   enum: ['land', 'house', 'office'],
    //   lowercase: true,
    //   required: true
    // },
    status: {
      type: String,
      enum: ['sold', 'available'],
      lowercase: true,
      required: true
    },
    features: {
      // type: [String],
      type: String,
    },
    poster: {
      type: Object,
      default: {}
    },
    gallery: [],
    video: {
      type: String
    },
    createdAt: {
      type: Date,
      immutable: true
      // required: true,
    },
    // updatedAt: {
    //   type: Date
    // },
  },
  {
    collection: 'estates',
    timestamps: true
  }
);

// estateSchema.method('transform', function () {
//   let obj = this.toObject();

//   //  Rename id field
//   obj.id = obj._id;
//   delete obj._id;

//   return obj;
// });


// estateSchema.index({ slug: 1, userid: 1 }, { unique: true })

const estateModel = mongoose.model('estate', estateSchema);

module.exports = estateModel;
