import 'angular';
import 'angular-ui-router';
import 'angular-socket-io';
import 'angular-messages';

//import bootstrap from "bootstrap-webpack";
//import 'angular-aria';
//import 'angular-animate';
//import 'angular-material';
//import 'angular-material/angular-material.css';
import moment from 'moment';
import 'animate.css/animate.css';

import $ from 'jquery';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-theme.css";

import routes from "./components/helpers/routes";
import alert from './components/helpers/alert';
import tokenFactory from './components/helpers/tokenFactory.js';
import authFactory from './components/helpers/authFactory.js';
import socketService from './components/helpers/socketService.js';

import header from "./components/header/header.js";
import config from "./components/config/config.js";
import register from './components/register/register.js';

import login from './components/login/login.js';
import logoutController from './components/login/logoutController.js';
import loginInterceptor from './components/login/loginInterceptor.js';

import main from './components/main/main.js';

import currency from './components/currency/currency.js';
import currencyFactory from './components/currency/currencyFactory.js';

import '../sass/style.sass';


angular.module('myApp', ['ui.router', 'ngMessages', 'btford.socket-io'])
    .config(routes)
    .constant('API_URL', 'http://localhost:3001/')
    .controller('logoutController', logoutController)
    .service('alert', alert)
    .factory('loginInterceptor', loginInterceptor)
    .factory('tokenFactory', tokenFactory)
    .factory('currencyFactory', currencyFactory)
    .service('authFactory', authFactory)
    .factory('socketService', socketService)
    .directive('header', header)
    .directive('register', register)
    .directive('login', login)
    .directive('currency', currency)
    .directive('config', config)
    .directive('main', main)
;


/* TODO Ng messages validation
 TODO Moment JS
 */

