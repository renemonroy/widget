/**
  This Module was created to use array of children classes easily.
**/

Module(App.Helpers, 'ChildrenManager')({

  prototype : {
 
    currentChildPos : 0,

    /**
     * Dispatches the new and old context of children. The goal is to not do
     * DOM manipulation and let the main Class take care of it.
    **/
    getChild : function getChild(index) {
      var myClass = this, myChild;
      if ( typeof index === 'number' && index !== myClass.currentChildPos ) {
        myChild = myClass.children[index];
        myClass.dispatch('child:onChange', {
          oldChild : myClass.children[myClass.currentChildPos],
          newChild : myChild
        });
        myClass.currentChildPos = index;
      }
      return myChild;
    },

    /**
     * Uses getChild to change context to the next child. It changes to the first
     * child if the last context was the last child.
    **/
    getNextChild : function getNextChild() {
      var myClass = this, myChild;
      if ( myClass.currentChildPos < (myClass.children.length - 1) ) {
        myChild = myClass.getChild(myClass.currentChildPos + 1);
      } else {
        myChild = myClass.getFirstChild();
      }
      return myChild;
    },

    /**
     * Uses getChild to change context to a previous child in the array. It changes
     * to the last one if the context was the first child.
    **/
    getPrevChild : function getPrevChild() {
      var myClass = this, myChild;
      if ( myClass.currentChildPos > 0 ) {
        myChild = myClass.getChild(myClass.currentChildPos - 1);
      } else {
        myChild = myClass.getLastChild();
      }
      return myChild;
    },
    
    /**
     * Uses getChild to change context to last child in the array.
    **/
    getFirstChild : function getFirstChild() {
      var myClass = this, myChild;
      myChild = myClass.getChild(0);
      return myChild;
    },

    /**
     * Uses getChild to change context to last child in the array.
    **/
    getLastChild : function getLastChild() {
      var myClass = this, myChild;
      myChild = myClass.getChild(myClass.children.length - 1);
      return myChild;
    },

    /**
     * Removes a child class from the parent. The element will be removed from DOM
     * too. Events are added to help.
    **/
    destroyChild : function destroyChild(myChild) {
      var myClass = this;
      myClass.dispatch('child:beforeDestroy', { destroyedChild : myChild });
      myChild.destroy();
      myClass.dispatch('child:afterDestroy', { destroyedChild : myChild });
      return this;
    },

    /**
     * Creates a new child Class instance with a random name. It does not
     * render and should does it manually.
    **/
    createChild : function createChild(instance, config) {
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
