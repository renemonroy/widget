/**
  This Module was created to use array of children classes easily.
**/

Module(App.Helpers, 'Children')({

  prototype : {
 
    currentPos : 0,

    /**
     * Dispatches the new and old context of children. The goal is to not do
     * DOM manipulation and let the main Class take care of it.
    **/
    goTo : function goTo(index) {
      var myClass = this;
      if ( typeof index === 'number' && index !== myClass.currentPos ) {
        myClass.dispatch('children:onGoTo', {
          currentChild : myClass.children[myClass.currentPos],
          newChild : myClass.children[index]
        });
        myClass.currentPos = index;
      }
      return this;
    },

    /**
     * Uses goTo to change context to the next child. It changes to the first
     * child if the last context was the last child.
    **/
    next : function next() {
      var myClass = this;
      if ( myClass.currentPos < (myClass.children.length - 1) ) {
        myClass.goTo(myClass.currentPos + 1);
      } else {
        myClass.goTo(0);
      }
      return this;
    },

    /**
     * Uses goTo to change context to a previous child in the array. It changes
     * to the last one if the context was the first child.
    **/
    prev : function prev() {
      var myClass = this;
      if ( myClass.currentPos > 0 ) {
        myClass.goTo(myClass.currentPos - 1);
      } else {
        myClass.goTo(myClass.children.length - 1);
      }
      return this;
    },

    /**
     * Removes a child class from the parent given a string 'name'. The element
     * will be removed from DOM too.
    **/
    remove : function remove(name) {
      var myClass = this; 
      myClass[name].destroy();
      return this;
    },

    /**
     * Creates a new child Class instance with a random name. It does not
     * render and should does it manually.
    **/
    create : function create(instance, el) {
      var myClass = this, config = {}, newChild;
      config.name = 'child_' + Math.random().toString().replace('.', '').substr(0, 24);
      if (el) {
        config.element = el;
      }
      newChild = myClass.appendChild( new instance(config));
      myClass.dispatch('children:onCreate', { newChild : newChild });
      return this;
    }
  
  }

});
