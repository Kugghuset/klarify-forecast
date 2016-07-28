'use strict'

import Vue from 'vue';
import template from './result-table.template.html';
import factFinancial from '../../services/financials.service.js';
import config from '../../config';
import utils from '../../services/utils.js';
import VueResource from 'vue-resource';
import $ from "jquery";

Vue.use(VueResource);

// Get shorthands to utils.storage and utils.http
const {storage, http} = utils;

import auth from './../../services/auth';

const ResultTable = Vue.extend({
  template,
  ready: function(){
    $(document).ready(function(){
      $("#postButton").tooltip({
        trigger: 'manual',
        delay: { "show": 0, "hide": 3000 }
      });
    });
  },
  props: {
    connectionOk: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data: function () {

    factFinancial.getCurrentActuals(previous()).then(function () {
      let actuals = storage.get('currentActuals');
      setTitles(actuals);
      this.actuals = actuals;
    }.bind(this))
    .catch( err => {console.log(err)});

    factFinancial.getCurrentForecast(now()).then(function () {
      let forecast = storage.get('currentForecast');
      setTitles(forecast);
      this.forecast = forecast;
    }.bind(this))
    .catch( err => {console.log(err)});

    let forecast = storage.get('currentForecast') || [];
    let actuals = storage.get('currentActuals') || [];

    setTitles(forecast);
    setTitles(actuals);

    return {
      forecast: forecast,
      actuals: actuals,
    }
  },
  methods: {
    post: function (event) {
      this.forecast.forEach(function(item) {
        setCalculatedFields(item);
        let url = config.baseUrl + '/api/forecast-financial/' + item.PeriodYYYYMM;
        Vue.http.put(url, item).then((response) => {
          $("#postButton").tooltip('toggle');
          this.connectionOk = true;
        }, (response) => {
          this.connectionOk = false;
        });
      }.bind(this));
    factFinancial.getCurrentActuals(previous());
    factFinancial.getCurrentForecast(now());
    let forecast = storage.get('currentForecast');
    let actuals = storage.get('currentActuals');
    }
  }
});

Vue.component('result-table', ResultTable)

export default ResultTable;

function now () {
  var currentTime = new Date();
  var month = currentTime.getMonth() + 1;
  if(month < 10) {
    month = '0' + month;
  };
  var year = currentTime.getFullYear();
  let period = year.toString() + month.toString()
  return period;  
};

function previous () {
  var currentTime = new Date();
  var month = currentTime.getMonth() + 1;
  if(month < 10) {
    month = '0' + month.toString();
  };
  var year = parseInt(currentTime.getFullYear()) - 1;
  let period = year.toString() + month.toString()
  return period; 
};

function setTitles (series) {

  var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  series.forEach(function(item) {
    let d = new Date(item.Date);
    let month = monthNames[d.getMonth()];
    let year = d.getFullYear();
    let title = month.toString() + " " + year.toString();
    item.title = title;
  });
}

function setCalculatedFields (item)  {
  item['Estimated Costs'] = parseInt(item['Estimated People Costs']) + parseInt(item['Estimated Other Costs']);
  item['Estimated Profit'] = parseInt(item['Estimated Revenue']) - parseInt(item['Estimated People Costs']) - parseInt(item['Estimated Other Costs']);
}