Class(App.UI, 'View').inherits(App.Widget)({

  ELEMENT_CLASS : 'ui-view',

  HTML : '<section></section>',

  prototype : {
  
    init : function(config) {
      var view = this;
      App.Widget.prototype.init.call(view, config);
      view._bindEvents();
    },

    _bindEvents : function _bindEvents() {

      var view = this;

      view.bind('beforeDeactivate', function() {
        view.disable();
      });

      view.bind('activate', function() {
        view.enable();
      });

    }
 
  }

});
