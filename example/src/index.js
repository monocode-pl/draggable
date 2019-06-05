import angular from 'angular';
import {DraggableModule} from 'draggable';
import {AppComponent} from './app.component';

angular.module('app', [DraggableModule])
  .component('app', AppComponent);