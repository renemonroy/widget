/*
Author: Fernando Trasviña
neon.js v1.0.0 http://github.com/azendal/neon
*/
var Interface=function Interface(e,c){var a,d,b;a=(e&&c)?e:this;d=(e&&c)?c:(e)?e:"interface"+Math.random().toString();b=function(f){f.isInterface=true;
f.name=d;a[d]=f;return a[d];};return b;};var Module=function Module(f,d){var a,c,b,e;a=(f&&d)?f:this;c=(f&&d)?d:(f)?f:"module"+Math.random().toString();
e={moduleName:c,prototype:{},__includedModules:[],include:function(g){var h;for(h in g){if(g.hasOwnProperty(h)&&h!=="prototype"&&h!=="isModule"&&h!=="__includedModules"&&h!=="include"&&h!=="moduleName"){e[h]=g[h];
}}if(g.hasOwnProperty("prototype")&&g.prototype){for(h in g.prototype){if(g.prototype.hasOwnProperty(h)){e.prototype[h]=g.prototype[h];}}}this.__includedModules.push(g);
return this;}};b=function(g){var h;e.isModule=true;for(h in g){if(g.hasOwnProperty(h)&&h!=="prototype"&&h!=="isModule"&&h!=="__includedModules"&&h!=="include"&&h!=="moduleName"){e[h]=g[h];
}}if(g.hasOwnProperty("prototype")&&g.prototype){for(h in g.prototype){if(g.prototype.hasOwnProperty(h)){e.prototype[h]=g.prototype[h];}}}a[c]=e;return a[c];
};b.includes=function(){for(var g=0;g<arguments.length;g++){e.include(arguments[g]);}return b;};return b;};var Class=function Class(c,b){var a,d,e;a=(c&&b)?c:this;
b=(c&&b)?b:(c)?c:"class"+Math.random().toString();d=function(){if(this.init){this.init.apply(this,arguments);}};d.__descendants=[];d.__implementedInterfaces=[];
d.__includedModules=[];d.className=b;d.include=function(f){var g;for(g in f){if(f.hasOwnProperty(g)&&g!="prototype"&&g!="constructor"&&g!="isModule"&&g!="include"&&g!="superClass"){d[g]=f[g];
}}if(f.hasOwnProperty("prototype")&&f.prototype){for(g in f.prototype){if(f.prototype.hasOwnProperty(g)){d.prototype[g]=f.prototype[g];}}}else{f.prototype={};
}d.__includedModules.push(f);return this;};e=function(f){var l,g,h,k,m,n=f.prototype;if(n){for(m in n){if(n.hasOwnProperty(m)){d.prototype[m]=n[m];}}delete f.prototype;
}for(m in f){if(f.hasOwnProperty(m)){d[m]=f[m];}}for(l=0,g=d.__implementedInterfaces.length;l<g;l++){for(h=0,k=d.__implementedInterfaces[l].constructor.length;
h<k;h++){if(!d[d.__implementedInterfaces[l].constructor[h]]){alert("must implement static "+d.__implementedInterfaces[l].name);break;}}if(d.__implementedInterfaces[l].hasOwnProperty("prototype")&&d.__implementedInterfaces[l].prototype){for(h=0,k=d.__implementedInterfaces[l].prototype.length;
h<k;h++){if(!d.prototype[d.__implementedInterfaces[l].prototype[h]]){alert("must implement prototype "+d.__implementedInterfaces[l].name);break;}}}}if(window.Li&&window.Li.ObjectSpy&&window.Li.Spy){d.__objectSpy=new Li.ObjectSpy();
d.__objectSpy.spy(d);d.__objectSpy.spy(d.prototype);}a[b]=d;return d;};e.inherits=function(h){var f,g;d.superClass=h;if(h.hasOwnProperty("__descendants")){h.__descendants.push(d);
}g=function(){};g.prototype=h.prototype;d.prototype=new g();d.prototype.constructor=d;for(f in h){if(h.hasOwnProperty(f)&&f!="prototype"&&f!=="className"&&f!=="superClass"&&f!="__descendants"&&f!="include"){d[f]=h[f];
}}delete this.inherits;return this;};e.ensures=function(g){for(var f=0;f<arguments.length;f++){d.__implementedInterfaces.push(arguments[f]);}delete this.ensures;
return e;};e.includes=function(){for(var f=0;f<arguments.length;f++){d.include(arguments[f]);}return e;};return e;};Class("CustomEvent")({prototype:{bubbles:true,cancelable:true,currentTarget:null,timeStamp:0,target:null,type:"",isPropagationStopped:false,isDefaultPrevented:false,isImmediatePropagationStopped:false,areImmediateHandlersPrevented:false,init:function init(a,c){this.type=a;
if(typeof c!=="undefined"){for(var b in c){if(c.hasOwnProperty(b)){this[b]=c[b];}}}},stopPropagation:function stopPropagation(){this.isPropagationStopped=true;
},preventDefault:function preventDefault(){this.isDefaultPrevented=true;},stopImmediatePropagation:function stopImmediatePropagation(){this.preventImmediateHandlers();
this.stopPropagation();},preventImmediateHandlers:function preventImmediateHandlers(){this.areImmediateHandlersPrevented=true;}}});CustomEventSupport=Module("CustomEventSupport")({eventListeners:null,bind:function(d,b){var e,a,c;
if(!this.eventListeners){this.eventListeners={};}if(!this.eventListeners[d]){this.eventListeners[d]=[];}e=false;c=this.eventListeners[d];for(a=0;a<c.length;
a++){if(c[a]===b){e=true;break;}}if(!e){this.eventListeners[d].push(b);}return this;},unbind:function(d,b){var a,e,c;e=false;if(!this.eventListeners){this.eventListeners={};
}if(typeof b=="undefined"){this.eventListeners[d]=[];}c=this.eventListeners[d];for(a=0;a<c.length;a++){if(c[a]===b){e=true;break;}}if(e){this.eventListeners[d].splice(a,1);
}return this;},dispatch:function(d,f){var e,c,a,b;if(this.eventListeners===null){this.eventListeners={};}if(typeof f==="undefined"){f={};}if(f.hasOwnProperty("target")===false){f.target=this;
}e=new CustomEvent(d,f);c=this.eventListeners[d]||[];a=this;for(b=0;b<c.length;b=b+1){c[b].call(a,e);if(e.areImmediateHandlersPrevented===true){break;}}return e;
},prototype:{eventListeners:null,bind:function(d,b){var e,a,c;if(!this.eventListeners){this.eventListeners={};}if(!this.eventListeners[d]){this.eventListeners[d]=[];
}e=false;c=this.eventListeners[d];for(a=0;a<c.length;a++){if(c[a]===b){e=true;break;}}if(!e){this.eventListeners[d].push(b);}return this;},unbind:function(d,b){var a,e,c;
e=false;a=0;if(!this.eventListeners){this.eventListeners={};}if(typeof b=="undefined"){this.eventListeners[d]=[];}c=this.eventListeners[d];for(a=0;a<c.length;
a++){if(c[a]==b){e=true;break;}}if(e){this.eventListeners[d].splice(a,1);}return this;},dispatch:function(d,f){var e,c,a,b;if(this.eventListeners===null){this.eventListeners={};
}if(typeof f==="undefined"){f={};}if(f.hasOwnProperty("target")===false){f.target=this;}e=new CustomEvent(d,f);c=this.eventListeners[d]||[];a=this;for(b=0;
b<c.length;b=b+1){c[b].call(a,e);if(e.areImmediateHandlersPrevented===true){break;}}return e;}}});NodeSupport=Module("NodeSupport")({prototype:{parent:null,children:[],appendChild:function(a){if(a.parent){a.parent.removeChild(a);
}if(!this.hasOwnProperty("children")){this.children=[];}this.children.push(a);this[a.name]=a;a.setParent(this);return a;},insertBefore:function(c,b){var a;
if(c.parent){c.parent.removeChild(c);}if(!this.hasOwnProperty("children")){this.children=[];}if(typeof b==="undefined"){this.appendChild(c);}else{a=this.children.indexOf(b);
this.children.splice(a,0,c);this[c.name]=c;c.setParent(this);}return c;},insertChild:function(b,a){console.warn("NodeSupport insertChild method is deprecated, try insertBefore");
if(b.parent){b.parent.removeChild(b);}if(!this.hasOwnProperty("children")){this.children=[];}if(typeof a=="undefined"){this.children.push(b);this[b.name]=b;
b.setParent(this);return b;}this.children.splice(a,0,b);this[b.name]=b;b.setParent(this);return b;},removeChild:function(b){var a=this.children.indexOf(b);
if(a!==-1){this.children.splice(a,1);delete this[b.name];b.parent=null;}return b;},setParent:function(a){this.parent=a;return this;},getDescendants:function(){var a=[];
this.children.forEach(function(b){a.push(b);});this.children.forEach(function(b){a=a.concat(b.getDescendants());});return a;},getPreviousSibling:function(){if(typeof this.parent==="undefined"){return;
}if(this.parent.children[0]===this){return;}return this.parent.children[this.parent.children.indexOf(this)-1];},getNextSibling:function(){if(typeof this.parent==="undefined"){return;
}if(this.parent.children[this.parent.children.length-1]===this){return;}return this.parent.children[this.parent.children.indexOf(this)+1];}}});