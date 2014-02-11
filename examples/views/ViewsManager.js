Class(App.UI, 'ViewsManager').inherits(App.Widget).includes(App.Modules.ChildrenSupport)({

  ELEMENT_CLASS : 'ui-views-manager',

  HTML : '<div></div>',

  prototype : {

    animateViews : true,

    /**
     * Both style classes required to animated transitions between views.
     * Supported: 'fade-out', 'scale-to-center', 'scale-from-center'
    **/

    /**
     * Supports : 'fade-in', 'scale-up-center'
    **/
    animationIn : 'fade-in',

    /**
     * Supports : 'fade-out', 'scale-down-center'
    **/
    animationOut : 'fade-out',

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

        if ( viewsManager.animateViews ) {
          e.oldChild.deactivateAnimated(viewsManager.animationOut);
          e.newChild.activateAnimated(viewsManager.animationIn);
        } else {
          e.oldChild.deactivate();
          e.newChild.activate();
        }

      });

    }

  }

});
