import 'angular';
import currency from './currency.js';
import currencyFactory from './currencyFactory.js';

export default angular.module('currency',[])
    .directive('currency',currency)
    .factory('currencyFactory',currencyFactory);