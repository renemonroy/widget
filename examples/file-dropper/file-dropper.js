Class(App.UI, 'FileDropper').inherits(App.Widget)({

	ELEMENT_CLASS : 'file-dropper',

	HTML : '<div><label>Drag and drop a file here</label></div>',

	prototype : {

		files : null,
		endpoint : '',

		init : function init(config) {
			App.Widget.prototype.init.call(this, config);
			this._bindEvents();
		},

		// Adds events to the class.
		_bindEvents : function _setupEvents(){
			var fileDropper = this;

			// Setup event listeners but waits untile the widget is 
			// rendered.
			fileDropper.bind('render', function() {
				fileDropper._handleEventListeners();
			});

		},

		// Adds event listeners to the element where files are going
		// to be dragged.
		_handleEventListeners : function _handleEventListeners() {
			var fileDropper = this,
				el = fileDropper.element,
				stopEvent = function(e) {
					e.stopPropagation();
					e.preventDefault();
				};

			el.addEventListener('dragover', function(e) {
				stopEvent(e);
			}, false);

			el.addEventListener('dragenter', function(e) {
				el.classList.add('dragover');
			}, false);

			el.addEventListener('dragleave', function(e) {
				el.classList.remove('dragover');
			}, false);

			el.addEventListener('drop', function(e) {
				stopEvent(e);
				el.classList.remove('dragover');
				var files = e.dataTransfer.files,
					len = files.length,
					i = 0;
				fileDropper.files = [];
				for (i; i < len; i++) {
					fileDropper.files.push(files[i]);
				}
				fileDropper.dispatch('droppedFiles', {
					files : fileDropper.files
				});
			}, false);
		},

		getCachedFiles : function getCachedFiles() {
			return this.files;
		},

		// Send files with Ajax without the need of a parent form 
		// in element.
		sendFiles : function sendFiles() {
			var form = new FormData();
			this.files.forEach( function(myFile, i) {
				form.append('data-' + i, myFile);
			});
			var xhr = new XMLHttpRequest();
			xhr.onload = function() {
				console.log('Upload complete!');
			};
			var repo = this.endpoint;
			if ( repo !== '' ) {
				xhr.open('post', repo, true);
				xhr.send(form);
			} else {
				console.log("No endpoint specified, can't send data...");
			}
			this.files = null;

			return this;
		}

		// Needs to add destroy method (remove listeners and null 
		// endpoint and files)

	}

});