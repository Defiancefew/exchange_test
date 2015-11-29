import 'angular';
import 'angular-ui-router';
import routes from "./routes";
import register from './components/register/register'

angular.module('myApp', ['ui.router'])
    .config(routes)
    .directive('register', register)
;