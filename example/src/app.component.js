export const AppComponent = {
  template: '<button draggable ng-click="$ctrl.onClick()">CLICK!</button>',
  controller: class AppController {
    onClick() {
      console.log('clicked');
    }
  }
};