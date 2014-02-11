/**
  This Module was created to use array of children classes easily.
**/

Module(App.Modules, 'ChildrenSupport')({

  prototype : {
 
    currentChildPos : null,

    /**
     * Dispatches the new and old context of children. The goal is to not do
     * DOM manipulation and let the main Class take care of it.
    **/
    getChildByIndex : function getChildByIndex(index) {
      var myClass = this, myChild, currentPos = myClass.currentChildPos;
      if ( typeof index === 'number' && index !== currentPos ) {
        myChild = myClass.children[index];
        myClass.dispatch('child:onChange', {
          oldChild : myClass.children[currentPos],
          newChild : myChild
        });
        myClass.currentChildPos = index;
      }
      return myChild || myClass.children[currentPos];
    },

    /**
     * Uses getChildByIndex to change context to the next child. It changes to the first
     * child if the last context was the last child.
    **/
    getNextChild : function getNextChild() {
      var myClass = this, myChild;
      if ( myClass.currentChildPos < (myClass.children.length - 1) ) {
        myChild = myClass.getChildByIndex(myClass.currentChildPos + 1);
      } else {
        myChild = myClass.getFirstChild();
      }
      return myChild;
    },

    /**
     * Uses getChildByIndex to change context to a previous child in the array. It changes
     * to the last one if the context was the first child.
    **/
    getPrevChild : function getPrevChild() {
      var myClass = this, myChild;
      if ( myClass.currentChildPos > 0 ) {
        myChild = myClass.getChildByIndex(myClass.currentChildPos - 1);
      } else {
        myChild = myClass.getLastChild();
      }
      return myChild;
    },
    
    /**
     * Uses getChildByIndex to change context to last child in the array.
    **/
    getFirstChild : function getFirstChild() {
      var myClass = this, myChild;
      myChild = myClass.getChildByIndex(0);
      return myChild;
    },

    /**
     * Uses getChildByIndex to change context to last child in the array.
    **/
    getLastChild : function getLastChild() {
      var myClass = this, myChild;
      myChild = myClass.getChildByIndex(myClass.children.length - 1);
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
     * Creates a new child Class instance with a random name if is no name is added. 
     * It does not render but creates a context for the first child.
    **/
    createChild : function createChild(instance, config) {
      var myClass = this, newChild;
      config = config || {};
      if ( !config.name ) {
        config.name = 'child_' + Math.random().toString().replace('.', '').substr(0, 24);
      }      
      newChild = myClass.appendChild( new instance(config));
      if ( myClass.currentChildPos === null ) {
        myClass.currentChildPos = 0;
      }
      myClass.dispatch('child:onCreate', { newChild : newChild });
      return newChild;
    }
  
  }

});
