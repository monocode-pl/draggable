#draggable
Makes any HTML element draggable.
###Usage
Install package
```bash
$ npm install @monocode/daggable
```
Add *draggable* module as a dependency
```javascript
import angular from 'angular';
import {DraggableModule} from '@monocode/draggable';

angular.module('my-app', [DraggableModule]);
```
You can use `draggable` directive on any HTML element
```html
<div id="comment" draggable></div>
<img src="..." draggable />
<input type="text" draggable />
```

> Important! Adding `draggable` directive to an HTML element will automatically change element's `position` to `fixed`. 

> When an element is dragged, its `click` events will not be triggered.  