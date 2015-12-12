import template from './alert.jade';
import controller from "./alertController.js";
import './alert.sass';

export default function(){
  return {
      restrict: 'E',
      template,
      scope: {
          type : '=',
          title: '=',
          message: '='
      },
      controller,
      controllerAs: 'alert',
      bindToController: true
  }
}