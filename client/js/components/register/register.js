import template from './register.jade';
import controller from "./registerController.js";
import './register.sass';

export default function(){
  return {
      restrict: 'E',
      template,
      scope: {},
      controller,
      controllerAs: 'register',
      bindToController: true
  }
}