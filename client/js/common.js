import 'angular';
import 'angular-ui-router';
import routes from "./routes";
import header from "./components/header/header.js";
import register from './components/register/register.js';
import login from './components/login/login.js';
import loginFactory from './components/login/loginFactory.js';

angular.module('myApp', ['ui.router'])
    .config(routes)
    .constant('API_URL','http://localhost:3000/')
    .factory('loginFactory',loginFactory)
    .directive('header',header)
    .directive('register', register)
    .directive('login',login)
;