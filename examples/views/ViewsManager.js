Class(App.UI, 'ViewsManager').inherits(App.Widget)({

  ELEMENT_CLASS : 'ui-views-manager',

  HTML : '<div></div>',

  prototype : {
  
    init : function(config) {
      App.Widget.prototype.init.call(this, config);
    }
  
  }

});
