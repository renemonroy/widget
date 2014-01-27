Class(App.UI, 'View').inherits(App.Widget)({

  ELEMENT_CLASS : 'ui-view',

  HTML : '<div></div>',

  prototype : {
  
    init : function(config) { 
      App.Widget.prototype.init.call(this, config);
    }
  
  }

});
