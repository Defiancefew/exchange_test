import 'angular';
import alert from './alert.js';

export default angular.module('alert',[])
    .directive('alert',alert);
