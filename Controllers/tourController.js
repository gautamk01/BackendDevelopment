const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
);

exports.idchecker = (req, res, next, val) => {
  //this is param middleware
  if (val * 1 > tours.length) {
    return res.status(404).json({ status: 'Failed', message: 'Invalid ID' });
  }
  next();
};

exports.checkbody = (req, res, next) => {
  if (!req.body.name || !req.body.place) {
    return res.status(400).json({
      status: 'Failed',
      message: 'Missing name or place',
    });
  }

  next();
};

exports.getallTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    result: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
  const tourid = req.params.id * 1;
  const tour = tours.find((x) => x.id === tourid); // we pass a callbackfunction
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

//Now lets understand post
/**
 * In Post we can add a New Tour file to the json
 * while posting Middleware plays an important role
 * That Parsing of JSON file will be ensured by the middleware
 *
 */
exports.createTour = (req, res) => {
  const newid = tours[tours.length - 1].id + 1;
  //assign will merge the Object with exsisting object
  // eslint-disable-next-line prefer-object-spread
  const newTour = Object.assign({ id: newid }, req.body);
  tours.push(newTour);
  //we wanted to pass a callback function
  // that should be asyc function
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    () => {
      res.status(201).json({
        status: 'Success',
        length: tours.length,
        data: {
          tour: newTour,
        },
      });
    },
  );
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'Success',
    data: {
      tour: `<Updated tour here....> `,
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'Success',
    data: null,
  });
};
