/**
  This Module was created to use array of children classes easily.
**/

Module(App.Helpers, 'Children')({

  prototype : {
 
    currentPos : 0,

    goTo : function goTo(index) {
      var myClass = this;
      if ( typeof index === 'number' && index !== myClass.currentPos ) {
        myClass.dispatch('goTo', {
          currentView : myClass.children[myClass.currentPos],
          newView : myClass.children[index]
        });
        myClass.currentPos = index;
      }
      return this;
    },

    next : function next() {
      var myClass = this;
      if ( myClass.currentPos < (myClass.children.length - 1) ) {
        myClass.goTo(myClass.currentPos + 1);
      } else {
        myClass.goTo(0);
      }
      return this;
    },

    prev : function prev() {
      var myClass = this;
      if ( myClass.currentPos > 0 ) {
        myClass.goTo(myClass.currentPos - 1);
      } else {
        myClass.goTo(myClass.children.length - 1);
      }
      return this;
    }
  
  }

});
