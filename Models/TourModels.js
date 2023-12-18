// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');
//Schema -> Model
// THis is basic Schema
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A Tour Must have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A Tour Must have a price'],
  },
});

//Model
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
