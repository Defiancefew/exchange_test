import template from './login.jade';
import controller from "./loginController.js";
import './login.sass';

export default function(){
  return {
      restrict: 'E',
      template,
      scope: {},
      controller,
      controllerAs: 'login',
      bindToController: true
  }
}