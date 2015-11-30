import template from './header.jade';
import controller from "./headerController.js";
import './header.sass';

export default function(){
    return {
        restrict: 'E',
        template,
        scope: {},
        controller,
        controllerAs: 'header',
        bindToController: true
    }
}