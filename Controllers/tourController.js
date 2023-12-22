const Tour = require('../Models/TourModels');
const TourModel = require('../Models/TourModels');
const APIfeatures = require('../utils/ApiFeatures');

//Now lets understand post
/**
 * In Post we can add a New Tour file to the json
 * while posting Middleware plays an important role
 * That Parsing of JSON file will be ensured by the middleware
 *
 */

exports.aggreatedDB = async (req, res) => {
  try {
    const stat = await TourModel.aggregate([
      { $match: { ratingsAverage: { $gte: 4.8 } } }, //This just filter things out
      {
        $group: {
          _id: { $toUpper: '$difficulty' },
          num: { $sum: 1 },
          numrating: { $avg: '$ratingsQuantity' },
          avgrating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          min: { $min: '$price' },
          max: { $max: '$price' },
        },
      },
      {
        $sort: { avgPrice: 1 }, //Sort by avgPrice
      },
      //we can again repeat the filter which is match
      {
        $match: { _id: { $ne: 'EASY' } }, //ne-> not equall to
      },
    ]);
    res.status(200).json({
      status: 'Successful',
      data: {
        stat,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Failed',
      message: err,
    });
  }
};

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

exports.getallTours = async (req, res) => {
  try {
    //Execute query
    const features = new APIfeatures(TourModel.find(), req.query)
      .filter()
      .sort()
      .fields()
      .pageing();

    const Tours = await features.query;
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      result: Tours.length,
      data: {
        Tours,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'Failed',
      message: 'Found an error',
    });
  }
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
    res.status(400).json({ status: 'failed', message: error });
  }
};

exports.getTour = async (req, res) => {
  try {
    const singleTour = await TourModel.findById(req.params.id);
    //TourModel.findOne({_id:req.params.id})
    res.status(200).json({
      status: 'success',
      data: {
        Tour: singleTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Failed',
      error: err,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const updatedTour = await TourModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );
    console.log(req.body);
    res.status(200).json({
      status: 'Success',
      data: {
        tour: updatedTour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: error,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    const deletedTour = await TourModel.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'Success',
      data: deletedTour,
    });
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      data: error,
    });
  }
};

exports.getMonthlyPlan = async (req, res) => {
  try {
    const year = req.params.year * 1;
    const plan = await Tour.aggregate([
      {
        $unwind: '$startDates',
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          numTourStarts: { $sum: 1 },
          tour: { $push: '$name' },
        },
      },
      {
        $addFields: { month: '$_id' },
      },
      {
        //this will hide from the projection
        $project: {
          _id: 0,
        },
      },
      {
        $sort: { numTourStarts: -1 },
      },
    ]);
    res.status(200).json({
      status: 'Success',
      result: plan.length,
      data: {
        plan,
        year,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Failed',
      message: err,
    });
  }
};

// exports.idchecker = (req, res, next, val) => {
//   //this is param middleware
//   if (val * 1 > tours.length) {
//     return res.status(404).json({ status: 'Failed', message: 'Invalid ID' });
//   }
//   next();
// };
