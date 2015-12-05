import template from './main.jade';
import controller from "./mainController.js";
import './main.sass';

export default function(){
    return {
        restrict: 'E',
        template,
        scope: {},
        controller,
        controllerAs: 'main',
        bindToController: true
    }
}