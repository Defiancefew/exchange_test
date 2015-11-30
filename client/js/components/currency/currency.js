import template from './currency.jade';
import controller from "./currencyController.js";
import './currency.sass';

export default function(){
    return {
        restrict: 'E',
        template,
        scope: {},
        controller,
        controllerAs: 'currency',
        bindToController: true
    }
}