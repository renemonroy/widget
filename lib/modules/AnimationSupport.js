Module(App.Modules, 'AnimationSupport')({

  prototype : {

    animating : false,

    _bindAnimations : function  _bindAnimations() {
      var myClass = this;

      myClass.element.addEventListener('webkitAnimationStart', function(e) {
        myClass.animating = true;
      });

      myClass.element.addEventListener('webkitAnimationEnd', function(e) {
        myClass.removeAnimation();
        myClass.animating = false;
      });
    },

    animate : function animate(animation) {
      var myClass = this;
      myClass.animation = animation;
      myClass.element.classList.add(animation);
      return myClass;
    },

    removeAnimation : function removeAnimation() {
      var myClass = this;
      myClass.element.classList.remove(myClass.animation);
      myClass.animation = null;
      if ( myClass.autoDeactive ) {
        myClass.deactivate();
        myClass.autoDeactive = null;
      }
      return myClass;
    },

    activateAnimated : function activateAnimated(animation) {
      var myClass = this;
      myClass.activate().animate(animation);
      return myClass;
    },

    deactivateAnimated : function deactivateAnimated(animation) {
      var myClass = this;
      myClass.autoDeactive = true;
      myClass.animate(animation);
      return myClass;
    }

  }

});
