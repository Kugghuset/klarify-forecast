'use strict'

import _ from 'lodash';
import sql from 'seriate';
import mssql from 'mssql';
import moment from 'moment';
import Promise from 'bluebird';

import utils from '../../utils/utils';
import config from '../../config';

// Import the sql module from utils.
const { sql: _sql } = utils;

/**
 * Items from the factFinancial model which not to use in the params.
 */
const nonParams = ['dateCreated', 'dateUpdated', 'isDisabled'];

/**
 * Returns a params object for *factFinancial*.
 *
 * @param {Object} factFinancial User object
 * @return {Object}
 */
function getParams(factFinancial = {}) {
  return _sql.getParams(factFinancialModel, nonParams, factFinancial);
};

/**
 * Returns a promise of the *top* number of factFinancials at page *page*.
 *
 * @param {Number} __top The top number of factFinancials to get, optional
 * @param {Number} __page The page number at which to get *top* number of factFinancials, optional
 * @return {Promise} -> {Object}
 */
export function find(__top, __page) {
  return new Promise((resolve, reject) => {
    // Get the top and offset if any
    let {top, offset} = utils.paginate(__top, __page);

    // No pagination will be used if *top* is undefined.
    let _query = _.isUndefined(top)
      ? sql.fromFile('./sql/factFinancial.find.sql')
      : utils.paginateQuery(sql.fromFile('./sql/factFinancial.find.sql'), 'FROM [dbo].[FactFinancial]', top, offset);

    // Execute the query
    sql.execute({
      query: _query
    })
    .then((factFinancials) => resolve(factFinancials))
    .catch(reject);
  });
}

/**
 * Returns a promise of the factFinancials at *factFinancialId*.
 *
 * @param {Number} factFinancialId The ID of the factFinancial
 * @return {Promise} -> {Object}
 */
export function getYearFinancials(period) {
  return new Promise((resolve, reject) => {
    // Execute the query and then objectify it if needed.
    sql.execute({
      query: sql.fromFile('./sql/factFinancial.getYearFinancials.sql'),
      params: {
        period: {
          type: sql.BigInt,
          val: period
        }
      }
    })
    .then((factFinancials) => {
      // Resolve the factFinancial
      resolve(factFinancials);
    })
    .catch(reject);
  });
}

/**
 * Returns a promise of the factFinancials at *factFinancialId*.
 *
 * @param {Number} factFinancialId The ID of the factFinancial
 * @return {Promise} -> {Object}
 */
export function findById(factFinancialId) {
  return new Promise((resolve, reject) => {
    // Execute the query and then objectify it if needed.
    sql.execute({
      query: sql.fromFile('./sql/factFinancial.findById.sql'),
      params: {
        factFinancialId: {
          type: sql.BigInt,
          val: factFinancialId
        }
      }
    })
    .then((factFinancials) => {
      // Resolve the factFinancial
      resolve(factFinancials[0]);
    })
    .catch(reject);
  });
}

export default {
  find: find,
  findById: findById,
  getYearFinancials: getYearFinancials
}
