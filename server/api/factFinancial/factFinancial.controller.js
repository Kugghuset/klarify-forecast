'use strict'

import FactFinancial from './factFinancial.db';
import config from '../../config';
import utils from '../../utils/utils';

/**
 * Route: GET '/api/factFinancials/'
 */
export const index = (req, res) => {
  // Get the top and page for pagination
  let {top, page} = req.query;

  FactFinancial.find(top, page)
  .then((factFinancials) => res.status(200).json(factFinancials))
  .catch((err) => utils.handleError(res, err));
}

/**
 * Route: GET '/api/factFinancials/:id'
 */
export const show = (req, res) => {
  // Get the id
  let {id} = req.params;

  FactFinancial.findById(id)
  .then((factFinancial) => res.status(200).json(factFinancial))
  .catch((err) => utils.handleError(res, err));
}

/**
 * Route: GET '/api/factFinancials/year'
 */
export const getYearFinancials = (req, res) => {
  // Get the id

  let {period} = req.params;

  FactFinancial.getYearFinancials(period)
  .then((factFinancial) => res.status(200).json(factFinancial))
  .catch((err) => utils.handleError(res, err));
}


export default {
  index: index,
  show: show,
  period: getYearFinancials
}
