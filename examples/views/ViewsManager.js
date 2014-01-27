Class(App.UI, 'ViewsManager').inherits(App.Widget).includes(App.Helpers.Children)({

  ELEMENT_CLASS : 'ui-views-manager',

  HTML : '<div></div>',

  prototype : {

    /**
     * Inherits Init method from Widget Class. It also runs all initial
     * methods needed in the beginning.
    **/
    init : function init(config) {
      var viewsManager = this;
      App.Widget.prototype.init.call(viewsManager, config); 
      viewsManager._bindEvents();
    },

    /**
     * Bind events dispatched by Modules or children Classes. The goal to
     * have them in one place is for organization.
    **/
    _bindEvents : function _bindEvents() {

      var viewsManager = this;

      /** 
       * When child context changes
      **/
      viewsManager.bind('children:onGoTo', function(views) {
        views.currentChild.deactivate();
        views.newChild.activate();
      });

    }

  }

});
