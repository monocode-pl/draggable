import {DraggableController} from './draggable.controller';

export function DraggableDirective() {
  return {
    restrict: 'A',
    controller: DraggableController
  };
}
