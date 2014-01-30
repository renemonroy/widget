/**
  This Module was created to use array of children classes easily.
**/

Module(App.Helpers, 'ChildrenManager')({

  prototype : {
 
    currentPos : 0,

    /**
     * Dispatches the new and old context of children. The goal is to not do
     * DOM manipulation and let the main Class take care of it.
    **/
    goTo : function goTo(index) {
      var myClass = this, myChild;
      if ( typeof index === 'number' && index !== myClass.currentPos ) {
        myChild = myClass.children[index];
        myClass.dispatch('child:onChange', {
          oldChild : myClass.children[myClass.currentPos],
          newChild : myChild
        });
        myClass.currentPos = index;
      }
      return myChild;
    },

    /**
     * Uses goTo to change context to the next child. It changes to the first
     * child if the last context was the last child.
    **/
    next : function next() {
      var myClass = this, myChild;
      if ( myClass.currentPos < (myClass.children.length - 1) ) {
        myChild = myClass.goTo(myClass.currentPos + 1);
      } else {
        myChild = myClass.first();
      }
      return myChild;
    },

    /**
     * Uses goTo to change context to a previous child in the array. It changes
     * to the last one if the context was the first child.
    **/
    prev : function prev() {
      var myClass = this, myChild;
      if ( myClass.currentPos > 0 ) {
        myChild = myClass.goTo(myClass.currentPos - 1);
      } else {
        myChild = myClass.last();
      }
      return myChild;
    },
    
    /**
     * Uses goTo to change context to last child in the array.
    **/
    first : function first() {
      var myClass = this, myChild;
      myChild = myClass.goTo(0);
      return myChild;
    },

    /**
     * Uses goTo to change context to last child in the array.
    **/
    last : function last() {
      var myClass = this, myChild;
      myChild = myClass.goTo(myClass.children.length - 1);
      return myChild;
    },

    /**
     * Removes a child class from the parent. The element will be removed from DOM
     * too. Events are added to help.
    **/
    remove : function remove(myChild) {
      var myClass = this;
      myClass.bind('child:beforeDestroy', { removedChild : myChild });
      myChild.destroy();
      myClass.bind('child:afterDestroy', { removedChild : myChild });
      return this;
    },

    /**
     * Creates a new child Class instance with a random name. It does not
     * render and should does it manually.
    **/
    create : function create(instance, config) {
      var myClass = this, newChild;
      config = config || {};
      if ( !config.name ) {
        config.name = 'child_' + Math.random().toString().replace('.', '').substr(0, 24);
      }      
      newChild = myClass.appendChild( new instance(config));
      myClass.dispatch('child:onCreate', { newChild : newChild });
      return newChild;
    }
  
  }

});
