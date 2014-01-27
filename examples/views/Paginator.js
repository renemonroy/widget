Module(App.Helpers, 'Paginator')({

  prototype : {
 
    current : 0,
    total : 0,

    goTo : function(index) {
      var that = this;
      if ( typeof index === 'number' && index !== that.current ) {
        that.children[that.current].deactivate();
        that.children[index].activate();
        that.current = index;
        console.log('Index >>', index);
      }
      return this;
    },

    next : function() {
      var that = this;
      if ( that.current < (that.total - 1) ) {
        that.goTo(that.current + 1);
      } else {
        that.goTo(0);
      }
      return this;
    },

    prev : function() {
      var that = this;
      if ( that.current > 0 ) {
        that.goTo(that.current - 1);
      } else {
        that.goTo(that.total - 1);
      }
      return this;
    }
  
  }

});
