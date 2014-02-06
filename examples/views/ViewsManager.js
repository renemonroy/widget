Class(App.UI, 'ViewsManager').inherits(App.Widget).includes(App.Helpers.ChildrenSupport)({

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
       * Deactivates the current view and activates the next view returned
       * when dispacthing goTo event.
      **/
      viewsManager.bind('child:onChange', function(e) {
        e.oldChild.deactivate();
        e.newChild.activate();
      });

    }

  }

});
