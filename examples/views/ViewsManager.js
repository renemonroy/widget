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
      this.bind('goTo', function(views) {
        views.currentView.deactivate();
        views.newView.activate();
      });
    },

    /**
     * Creates a new View Widget with a random name and renders it in
     * Views Manager element.
    **/
    create : function create() {
      var viewsManager = this, newView;
      newView = viewsManager.appendChild( new App.UI.View({
        name : 'view_' + Math.random().toString().replace('.', '').substr(0,24)
      }));
      newView.render(viewsManager.element);
      return this;
    },

    /**
     * Removes a View from the manager from a string 'name'. The element
     * will be removed from DOM too.
    **/
    remove : function remove(viewName) {
      this[viewName].destroy();
      return this;
    }

  }

});
