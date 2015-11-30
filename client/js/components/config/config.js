import template from './config.jade';
import controller from "./configController.js";
import './config.sass';

export default function(){
    return {
        restrict: 'E',
        template,
        scope: {},
        controller,
        controllerAs: 'config',
        bindToController: true
    }
}