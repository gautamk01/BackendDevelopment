// eslint-disable-next-line import/no-extraneous-dependencies
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

const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`The APP is running on port ${port}`);
});
