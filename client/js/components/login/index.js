import 'angular';
import login from './login.js';
import loginInterceptor from './loginInterceptor.js';
import logoutController from './logoutController.js';

export default angular.module('login',[])
    .factory('loginInterceptor',loginInterceptor)
    .controller('logoutController',logoutController)
    .directive('login',login);
