Class(App.UI, 'View').inherits(App.Widget)({

  ELEMENT_CLASS : 'ui-view',

  HTML : '<section></section>',

  prototype : {

    transitionEnd : 'transitionend webkitTransitionEnd oTransitionEnd otransitionend',
  
    init : function(config) {
      var view = this;
      App.Widget.prototype.init.call(view, config);
      view._bindEvents();
    },

    _bindEvents : function _bindEvents() {

      var view = this;

      /**
       * Disable this view before deactivation.
      **/
      view.bind('beforeDeactivate', view.disable);

      /**
       * Enable this view after activation.
      **/
      view.bind('activate', view.enable);

    } 
  }

});
