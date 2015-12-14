import 'angular';
import 'angular-ui-router';
import 'angular-socket-io';
import 'angular-messages';

import moment from 'moment'
import $ from 'jquery';
import _ from 'lodash';

import 'animate.css/animate.css';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-theme.css";

import './components/config';
import './components/alert';
import './components/currency';
import './components/header';
import './components/helpers';
import './components/login';
import './components/register';

import '../sass/style.sass';
import '../css/loader.css';

angular.module('myApp', ['ui.router', 'ngMessages',
    'btford.socket-io', 'alert', 'config','currency','header',
    'helpers','login','register']);

/* TODO Ng messages validation
   TODO Moment JS
 */

