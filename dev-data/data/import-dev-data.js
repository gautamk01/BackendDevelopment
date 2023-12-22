/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable import/order */
// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');
const dotenv = require('dotenv'); //THis mainly used to connect config file
const Tourmodel = require('../../Models/TourModels');
const fs = require('fs');

dotenv.config({ path: './config.env' });

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

//read json file
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'),
);

///import data to database
const importData = async () => {
  try {
    await Tourmodel.create(tours);
    console.log('Data Successfully loading');
  } catch (err) {
    console.log(err);
  }
};

//Delete all data from collection
const deleteData = async () => {
  try {
    await Tourmodel.deleteMany();
    console.log('Data Successfully Deleted!');
  } catch (err) {
    console.log(err);
  }
};

importData();
