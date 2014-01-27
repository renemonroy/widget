Class(App.UI, 'View').inherits(App.Widget)({

  ELEMENT_CLASS : 'ui-view',

  HTML : '<section></section>',

  prototype : {
  
    init : function(config) { 
      App.Widget.prototype.init.call(this, config);
    },

    _activate : function() {
      var viewEl = this.element;
      viewEl.style.display = 'block';
    },

    _deactivate : function() {
      var viewEl = this.element;
      viewEl.style.display = 'none';
    }
  
  }

});
