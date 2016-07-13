'use strict'

import Promise from 'bluebird';

import config from '../config';
import utils from './utils.js';
import auth from './auth.js';

// Get shorthands to utils.storage and utils.http
const {storage, http} = utils;

let __currentFinancials;

function getCurrentRemoteForecast(period) {

	return new Promise((resolve, reject) => {
		let _headers = auth.getHeaders();
    http.get(`${config.baseUrl}/api/forecast-financial/${period}`, {headers: _headers})
    .then((financials) => {
      storage.set('currentForecast', financials);
    })
    .catch(reject);
	})
}

function getCurrentRemoteActuals(period) {

	return new Promise((resolve, reject) => {
		let _headers = auth.getHeaders();
    http.get(`${config.baseUrl}/api/fact-financial/${period}`, {headers: _headers})
    .then((financials) => {
      storage.set('currentActuals', financials);
    })
    .catch(reject);
	})
}

export default {
  getCurrentActuals: getCurrentRemoteActuals,
  getCurrentForecast: getCurrentRemoteForecast
}