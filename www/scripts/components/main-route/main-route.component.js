'use strict'

import Vue from 'vue';
import template from './main-route.template.html';

import auth from './../../services/auth';

const MainRouteComponent = Vue.extend({
  template,
  props: {
  },
  methods: {
  },
});

export default MainRouteComponent;


// Return today's date and time
var currentTime = new Date()

// returns the month (from 0 to 11)
var month = currentTime.getMonth() + 1

// returns the day of the month (from 1 to 31)
var day = currentTime.getDate()

// returns the year (four digits)
var year = currentTime.getFullYear()
