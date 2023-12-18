const TourModel = require('../Models/TourModels');

//Now lets understand post
/**
 * In Post we can add a New Tour file to the json
 * while posting Middleware plays an important role
 * That Parsing of JSON file will be ensured by the middleware
 *
 */

exports.getallTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    // result: tours.length,
    // data: {
    //   tours,
    // },
  });
};

exports.getTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    // data: {
    //   tour,
    // },
  });
};

exports.createTour = async (req, res) => {
  try {
    //Old Methord
    // const newTour = new Tour({});
    // newTour.save();
    const newTour = await TourModel.create(req.body);
    res.status(201).json({
      status: 'Success',
      data: {
        tour: newTour,
      },
    });
  } catch (error) {
    res.status(400).json({ status: 'failed', message: 'Invalid data sent' });
  }
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

// exports.idchecker = (req, res, next, val) => {
//   //this is param middleware
//   if (val * 1 > tours.length) {
//     return res.status(404).json({ status: 'Failed', message: 'Invalid ID' });
//   }
//   next();
// };
