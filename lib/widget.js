/*

This is a fork of widget.js (v1.0.0) created by Azendal (http://github.com/azendal)
Author: René Monroy
Description: Class library designed to create UI widgets easily. This version uses new Web API interfaces which means it doesn't depend on jQuery.
Dependencies: Neon Class System (http://github.com/azendal/neon)
Version: v0.1.0

--------------------------------------------------------------

Features of the widget system

* A custom and easy to handle event binding, dispatching and manipulation, with some sort of bubbling support
* A module system which we can use to include specific behaviour to any widget and reuse the code where needed
* A tree structure support for the widgets that the event system could bubble, and that also serves as
* A navigation system.
* The widgets must be able to be grouped to form more complex widgets
* Remove the complexity of DOM manipulation and handling
* A way to wrap widgets at our convenience to reuse widgets avaliable and make them comly to our needs
without the need to hack those widgets, that would force us to maintain the new versions of those widgets
and that is a very complex task when widgets become so complex.
* A widget system that would allow us to start wrapping some widgets for a fast start and later code our own widgets
at will.
* expose a consistent API that allow us to choose the use of widgets by API calls and user interaction at will and with the same
clearance and capacity
* an easy way to allow subclasing widgets
* an easy way to provide new html, class, and css for a specific instance of a widget that would remove us the need
to create complex inheritance structures that are hard to maintain.

*/

Class(App, 'Widget').includes(CustomEventSupport, NodeSupport)({

    // The default html for the widget, at the most simple case this is just a div.
    HTML : '<div></div>',

    // The widget container default class for all widgets is widget.
    ELEMENT_CLASS : 'widget',

    prototype : {

        // Holds the active status of the widget. By default all widgets 
        // are deactivated waiting for an action to activate it.
        active   : false,

        // Holds the disabled status of the widget. By default all widgets 
        // are enabled and only by API could be disabled.
        disabled : false,

        // Implementatiion of the init method. This will run each time a new
        // widget is instantiated.
        init : function init(config) {
            Object.keys(config || {}).forEach(function (propertyName) {
                this[propertyName] = config[propertyName];
            }, this);

            if ( this.element == null ) {
                var tmp = document.createElement('div');
                tmp.insertAdjacentHTML('afterbegin', this.constructor.HTML);
                this.element = tmp.firstChild;
                this.element.classList.add(this.constructor.ELEMENT_CLASS);
                tmp = null;
            }

            if ( this.hasOwnProperty('className') === true ) {
                this.element.classList.add(this.className);
            }
        },

        // Implementation of the activate method, when you need an override, 
        // do it over this method instead of doing it on activate.
        _activate : function _activate() {
            this.active = true;
            this.element.classList.add('active');
        },

        // Public activation method for widget, you can listen to this event 
        // to take some other actions, but the most important part of this 
        // method is that it runs its default action, (its activation) this 
        // method uses _activate as its implementation to maintain the events 
        // order intact.
        activate : function activate() {
            this.dispatch('beforeActivate');
            this._activate();
            this.dispatch('activate');
            return this;
        },

        // This is the oposite of activation method and as such it must be
        // treated as important as that.
        _deactivate : function _deactivate() {
            this.active = false;
            this.element.classList.remove('active');
        },

        // Public deactivation method for widget, you can listen to this event
        // to take some other actions, but the most important part of this
        // method is that it runs its default action, (its activation)
        // this method uses _deactivate as its implementation to maintain
        // the events order intact.
        deactivate : function deactivate() {
            this.dispatch('beforeDeactivate');
            this._deactivate();
            this.dispatch('deactivate');
            return this;
        },

        // If you need to provide a different procedure for enable you must 
        // override this method and call "super".
        _enable : function _enable() {
            this.disabled = false;
            this.element.classList.remove('disable');
        },

        // Public enable method, this method should not be overriden.
        enable : function enable() {
            this.dispatch('beforeEnable');
            this._enable();
            this.dispatch('enable');

            return this;
        },

        // Adds the class disable to the Widget element.
        _disable : function _disable() {
            this.disabled = true;
            this.element.classList.add('disable');
        },

        // Disables the widget, the idea behind disabling a widget comes from 
        // DOM form elements. so following this idea all widgets can be 
        // disabled and queried for its disabled state via the disabled 
        // property. Same as DOM form elements there is feedback and that is 
        // why the default implementation sets the "disable" class on the 
        // element so proper visual feedback can be provided to the user.
        disable : function disable() {
            this.dispatch('beforeDisable');
            this._disable();
            this.dispatch('disable');

            return this;
        },

        // Destroy implementation. Its main responsabilities are cleaning all 
        // references to other objects so garbage collector can collect the memory 
        // used by this and the other objects.
        _destroy : function _destroy() {
            var childrenLength;
            if ( this.element ) {
                this.element.remove();
            }
            if ( this.children !== null ){
                childrenLength = this.children.length;
                while( childrenLength > 0 ){
                    this.children[0].destroy();
                    if ( this.children.length === childrenLength ) {
                        this.children.shift();
                    }
                    childrenLength--;
                }
            }
            this.children       = null;
            this.element        = null;
            this.eventListeners = null;
        },

        // Destroy public method, this one should not be replaced.
        destroy : function destroy() {
            this.dispatch('beforeDestroy');
            this._destroy();
            this.dispatch('destroy');
            return null;
        },

        // The render method is the mechanism by which you pass a widget from living only 
        // on memory to get into the DOM and with this into the  application flow. The 
        // recomendation is that render is the last method of the setup of a widget, 
        // including appending its children. this is because once a widget gets renderer, 
        // further operations cause browser reflows, and DOM operations are slower than 
        // memory operations. This method should not be replaced by its children.
        render : function render(el, pos) {
            switch( pos ) {
                case 'beforebegin' :
                    el.parentNode.insertBefore(this.element, el);
                    break;
                case 'afterbegin' :
                    el.insertBefore(this.element, el.firstChild);
                    break;
                case 'afterend' :
                    el.parentNode.insertBefore(this.element, el.nextSibling);
                    break;
                default :
                    el.appendChild(this.element);
                    break;
            }
            this.dispatch('render');
            return this;
        }

    }
});