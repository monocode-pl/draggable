import angular from 'angular';
import {DraggableDirective} from './draggable.directive';

export const DraggableModule = angular.module('@monocode/draggable', [])
  .directive('draggable', DraggableDirective)
  .name;