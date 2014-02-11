Class(App.UI, 'View').inherits(App.Widget).includes(App.Modules.AnimationSupport)({

  ELEMENT_CLASS : 'ui-view',

  HTML : '<section></section>',

  prototype : {
  
    init : function(config) {
      var view = this;
      App.Widget.prototype.init.call(view, config);
      view._bindAnimations();
    }

  }

});
