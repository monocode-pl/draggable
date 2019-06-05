export class DraggableController {
  constructor($element, $document, $window) {
    this.element = $element[0];
    this.documentEl = $document[0].documentElement;
    this.window = $window;
  }

  $onInit() {
    this.dragging = false;

    this.onElementEvent('mousedown', event => this.onMouseDown(event));

    this.element.style.position = 'fixed';
    this.element.style.top = 0;
    this.element.style.left = 0;
  }

  onElementEvent(...args) {
    return onEvent(this.element, ...args);
  }

  onDocumentEvent(...args) {
    return onEvent(this.documentEl, ...args);
  }

  onMouseDown(event) {
    this.removeMouseUpListener = this.onDocumentEvent('mouseup', event =>
      this.onMouseUp(event)
    );
    this.removeMouseMoveListener = this.onDocumentEvent(
      'mousemove',
      event => this.onMouseMove(event),
      { capture: true }
    );
    this.removeMouseLeaveListener = this.onDocumentEvent('mouseleave', event =>
      this.onMouseLeave(event)
    );
  }

  onMouseUp(event) {
    if (this.isDragging()) {
      this.stopDragging();
    }

    this.removeDocumentListeners();
  }

  onMouseMove(event) {
    if (!this.isDragging()) {
      this.startDragging();
    }

    this.doDrag(event);
  }

  onMouseLeave(event) {
    console.log('mouseleave');
    if (this.isDragging()) {
      this.stopDragging();
    }

    this.removeDocumentListeners();
  }

  isDragging() {
    return this.dragging;
  }

  stopDragging() {
    this.dragging = false;
    this.element.style.pointerEvents = 'auto';
  }

  startDragging() {
    this.dragging = true;
    this.element.style.pointerEvents = 'none'; // prevents firing 'click' event if element is dragged
  }

  get elementTop() {
    return parseInt(this.element.style.top) || 0;
  }

  get elementLeft() {
    return parseInt(this.element.style.left) || 0;
  }

  get elementWidth() {
    return this.element.offsetWidth;
  }

  get elementHeight() {
    return this.element.offsetHeight;
  }

  get windowWidth() {
    return this.window.innerWidth;
  }

  get windowHeight() {
    return this.window.innerHeight;
  }

  doDrag(event) {
    const newTop = this.elementTop + event.movementY;
    const newLeft = this.elementLeft + event.movementX;
    const { top, left } = this.limitPositionToWindow(newTop, newLeft);

    this.element.style.top = `${top}px`;
    this.element.style.left = `${left}px`;
  }

  limitPositionToWindow(top, left) {
    const minTop = 0;
    const maxTop = this.windowHeight - this.elementHeight;
    const minLeft = 0;
    const maxLeft = this.windowWidth - this.elementWidth;

    return {
      top: Math.min(Math.max(top, minTop), maxTop),
      left: Math.min(Math.max(left, minLeft), maxLeft)
    };
  }

  removeDocumentListeners() {
    this.removeMouseUpListener();
    this.removeMouseMoveListener();
    this.removeMouseLeaveListener();
  }
}

DraggableController.$inject = ['$element', '$document', '$window'];

function onEvent(eventTarget, eventName, callback, options) {
  eventTarget.addEventListener(eventName, callback, options);

  return () => {
    eventTarget.removeEventListener(eventName, callback, options);
  };
}


