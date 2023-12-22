const express = require('express');
const tourController = require('../Controllers/tourController');

const tourRoute = express.Router();

// tourRoute.param('id', tourController.idchecker); //Middleware for param :- id

tourRoute
  .route('/top-5-tours')
  .get(tourController.aliasTopTours, tourController.getallTours);

tourRoute.route('/tour-status').get(tourController.aggreatedDB);
tourRoute.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

tourRoute
  .route('/')
  .get(tourController.getallTours)
  .post(tourController.createTour);
tourRoute
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = tourRoute;
