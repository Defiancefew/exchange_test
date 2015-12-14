import 'angular';
import alert from './alert.js';
import authFactory from './authFactory.js';
import routes from './routes.js';
import socketService from './socketService.js';
import tokenFactory from './tokenFactory.js';
import moment from 'moment';

export default angular.module('helpers',[])
    .config(routes)
    .constant('API_URL', 'http://localhost:3001/')
    .constant('moment',moment)
    .service('alert',alert)
    .service('authFactory',authFactory)
    .factory('tokenFactory',tokenFactory)
    .factory('socketService',socketService);