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
 * Returns a promise of the forecastFinancials at *forecastFinancialId*.
 *
 * @param {Number} forecastFinancialId The ID of the forecastFinancial
 * @return {Promise} -> {Object}
 */
export function getYearFinancials(period) {
  return new Promise((resolve, reject) => {
    // Execute the query and then objectify it if needed.
    sql.execute({
      query: sql.fromFile('./sql/forecastFinancial.getYearFinancials.sql'),
      params: {
        period: {
          type: sql.BigInt,
          val: period
        }
      }
    })
    .then((forecastFinancials) => {
      // Resolve the forecastFinancial
      resolve(forecastFinancials);
    })
    .catch(reject);
  });
}

/**
 * @param {Number} forecastFinancialId The ID of the forecastFinancial
 * @param {Object} forecastFinancial The forecastFinancial values to update with
 * @return {Promise} -> {Object}
 */
export function update(period, forecastFinancial) {
  return new Promise((resolve, reject) => {
    // Get the params

    sql.execute({
      query: sql.fromFile('./sql/forecastFinancial.update.sql'),
      params: {
        period: {
          type: sql.BigInt,
          val: forecastFinancial['PeriodYYYYMM']
        },
        rev: {
          type: sql.BigInt,
          val: forecastFinancial['Estimated Revenue']
        },
        pro: {
          type: sql.BigInt,
          val: forecastFinancial['Estimated Profit']
        },
        cost: {
          type: sql.BigInt,
          val: forecastFinancial['Estimated Costs']
        },
        people: {
          type: sql.BigInt,
          val: forecastFinancial['Estimated People Costs']
        },
        other: {
          type: sql.BigInt,
          val: forecastFinancial['Estimated Other Costs']
        },
      }
    })
    .then((forecastFinancials) => resolve("Record updated at " + period + ": " + JSON.stringify(forecastFinancial)))
    .catch(reject)
  });
}

export default {
  update: update,
  getYearFinancials: getYearFinancials
}
