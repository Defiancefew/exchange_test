import 'angular';
import currency from './currency.js';

export default angular.module('currency',[])
    .directive('currency',currency)
