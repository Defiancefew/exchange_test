import 'angular';
import 'angular-ui-router';
import 'angular-messages';
import moment from 'moment';

import routes from "./routes";

import header from "./components/header/header.js";
import config from "./components/config/config.js";
import register from './components/register/register.js';

import login from './components/login/login.js';
import logoutController from './components/login/logoutController.js';
import loginFactory from './components/login/loginFactory.js';

import currencyFactory from './components/currency/currencyFactory.js';
import currency from './components/currency/currency.js';

angular.module('myApp', ['ui.router','ngMessages'])
    .config(routes)
    .constant('API_URL', 'http://localhost:3000/')
    .controller('logoutController',logoutController)
    .factory('loginFactory', loginFactory)
    .factory('currencyFactory',currencyFactory)
    .directive('header', header)
    .directive('register', register)
    .directive('login', login)
    .directive('currency', currency)
    .directive('config', config)
;

//var now = moment().format();
//console.log(now);
//console.log(moment(now).fromNow());

