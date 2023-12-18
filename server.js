const mongoose = require('mongoose');
const dotenv = require('dotenv'); //THis mainly used to connect config file

dotenv.config({ path: './config.env' });
const app = require('./app');

console.log(process.env.DATA_BASE);
const DB = process.env.DATA_BASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('DB is connected');
  });

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

//This is an instance of Tour Model
const testTour = new Tour({
  name: 'The Forest Hiker',
  rating: 4.7,
  price: 450,
});

testTour
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((error) => {
    console.log(`There is an error ${error}`);
  });

const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`The APP is running on port ${port}`);
});
