'use strict'

import ForecastFinancial from './forecastFinancial.db';
import config from '../../config';
import utils from '../../utils/utils';

/**
 * Route: GET '/api/forecastFinancials/'
 */
export const index = (req, res) => {
  // Get the top and page for pagination
  let {top, page} = req.query;

  ForecastFinancial.find(top, page)
  .then((forecastFinancials) => res.status(200).json(forecastFinancials))
  .catch((err) => utils.handleError(res, err));
}

/**
 * Route: GET '/api/forecastFinancials/:id'
 */
export const show = (req, res) => {
  // Get the id
  let {id} = req.params;

  ForecastFinancial.findById(id)
  .then((forecastFinancial) => res.status(200).json(forecastFinancial))
  .catch((err) => utils.handleError(res, err));
}

/**
 * Route: GET '/api/forecastFinancials/year'
 */
export const getYearFinancials = (req, res) => {

  let {period} = req.params;

  ForecastFinancial.getYearFinancials(period)
  .then((forecastFinancial) => res.status(200).json(forecastFinancial))
  .catch((err) => utils.handleError(res, err));
}

/**
 * Route: PUT '/api/forecastFinancials/:id'
 */
export const update = (req, res) => {
  // Get the id and forecastFinancial
  let {id} = req.params;
  let _forecastFinancial = req.body;

  ForecastFinancial.update(id, _forecastFinancial)
  .then((forecastFinancial) => res.status(200).json(forecastFinancial))
  .catch((err) => utils.handleError(res, err));
}

export default {
  index: index,
  show: show,
  update: update,
  period: getYearFinancials
}
