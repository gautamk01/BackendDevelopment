// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');
//Schema -> Model
// THis is basic Schema
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A Tour Must have a name'],
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, 'A Tour must have a duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a group Size'],
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a Difficulty'],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'A Tour Must have a price'],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true, //ONly work for string which is use to remove white spaces
    required: [true, 'A tour must have a Summery'],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a cover image'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDates: [Date],
});

//Model
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
