const TourModel = require('../Models/TourModels');

//Now lets understand post
/**
 * In Post we can add a New Tour file to the json
 * while posting Middleware plays an important role
 * That Parsing of JSON file will be ensured by the middleware
 *
 */

exports.getallTours = async (req, res) => {
  try {
    const Tours = await TourModel.find();
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

// exports.idchecker = (req, res, next, val) => {
//   //this is param middleware
//   if (val * 1 > tours.length) {
//     return res.status(404).json({ status: 'Failed', message: 'Invalid ID' });
//   }
//   next();
// };
