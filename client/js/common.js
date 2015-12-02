import 'angular';
import 'angular-ui-router';
import 'angular-messages';
import moment from 'moment';
import 'animate.css/animate.css';
import '../sass/style.sass';

import routes from "./routes";
import alert from './alert';

import header from "./components/header/header.js";
import config from "./components/config/config.js";
import register from './components/register/register.js';
import socketFactory from './components/currency/socketFactory.js';

import login from './components/login/login.js';
import logoutController from './components/login/logoutController.js';
import loginFactory from './components/login/loginFactory.js';
import loginInterceptor from './components/login/loginInterceptor.js';

import currencyFactory from './components/currency/currencyFactory.js';
import currency from './components/currency/currency.js';

angular.module('myApp', ['ui.router','ngMessages'])
    .config(routes)
    .constant('API_URL', 'http://localhost:3001/')
    .controller('logoutController',logoutController)
    .service('alert',alert)
    .factory('loginFactory', loginFactory)
    .factory('currencyFactory',currencyFactory)
    .factory('loginInterceptor', loginInterceptor)
    .factory('socketFactory',socketFactory)
    .directive('header', header)
    .directive('register', register)
    .directive('login', login)
    .directive('currency', currency)
    .directive('config', config)
;

//var now = moment().format();
//console.log(now);
//console.log(moment(now).fromNow());

/* TODO Ng messages validation
   TODO Moment JS
 */