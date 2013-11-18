/*
This is a fork of widget.js (v1.0.0) created by Azendal (http://github.com/azendal)
Author: René Monroy
Description: Class library designed to create UI widgets easily. This version uses new Web API interfaces which means it doesn't depend on jQuery.
Dependencies: Neon Class System (http://github.com/azendal/neon)
Version: v0.1.0
*/

Class(App, 'Widget').includes(CustomEventSupport, NodeSupport)({

    HTML : '<div></div>',

    ELEMENT_CLASS : 'widget',

    prototype : {

        active   : false,
        disabled : false,

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

        _activate : function _activate() {
            this.active = true;
            this.element.classList.add('active');
        },

        activate : function activate() {
            this.dispatch('beforeActivate');
            this._activate();
            this.dispatch('activate');
            return this;
        },

        _deactivate : function _deactivate() {
            this.active = false;
            this.element.classList.remove('active');
        },

        deactivate : function deactivate() {
            this.dispatch('beforeDeactivate');
            this._deactivate();
            this.dispatch('deactivate');
            return this;
        },

        _enable : function _enable() {
            this.disabled = false;
            this.element.classList.remove('disable');
        },

        enable : function enable() {
            this.dispatch('beforeEnable');
            this._enable();
            this.dispatch('enable');

            return this;
        },

        _disable : function _disable() {
            this.disabled = true;
            this.element.classList.add('disable');
        },

        disable : function disable() {
            this.dispatch('beforeDisable');
            this._disable();
            this.dispatch('disable');

            return this;
        },

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

        destroy : function destroy() {
            this.dispatch('beforeDestroy');
            this._destroy();
            this.dispatch('destroy');
            return null;
        },

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