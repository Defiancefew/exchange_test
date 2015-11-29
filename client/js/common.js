import 'angular';
import 'angular-ui-router';
import routes from "./routes";
import register from './components/register/register.js';
import login from './components/login/login.js';


angular.module('myApp', ['ui.router'])
    .config(routes)
    .directive('register', register)
    .directive('login',login)
;