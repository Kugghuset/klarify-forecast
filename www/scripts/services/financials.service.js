'use strict'

import Promise from 'bluebird';

import config from '../config';
import utils from './utils.js';
import auth from './auth.js';

// Get shorthands to utils.storage and utils.http
const {storage, http} = utils;

let __currentFinancials;

function getCurrentRemoteForecast(period) {
  let _headers = auth.getHeaders();
  return http.get(`${config.baseUrl}/api/forecast-financial/${period}`, {headers: _headers})
  .then((financials) => {
    storage.set('currentForecast', financials);
    return Promise.resolve(financials);
  })
}

function getCurrentRemoteActuals(period) {
  let _headers = auth.getHeaders();
  return http.get(`${config.baseUrl}/api/fact-financial/${period}`, {headers: _headers})
  .then((financials) => {
    storage.set('currentActuals', financials);
    return Promise.resolve(financials);
  })
}

export default {
  getCurrentActuals: getCurrentRemoteActuals,
  getCurrentForecast: getCurrentRemoteForecast
}