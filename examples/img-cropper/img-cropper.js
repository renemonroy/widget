Class(App.UI, 'ImageCropper').inherits(App.Widget)({

	ELEMENT_CLASS : 'image-cropper',

	HTML : '<div><canvas style="border: 1px solid #333;"></canvas></div>',

	prototype : {

		canvas : null,
		image : null,

		/**
		 * Inital configuration and methods
		**/
		init : function init(config) {
			App.Widget.prototype.init.call(this, config);
			var imgCropper = this;

			imgCropper.bindEvents();
		},

		/**
		 * Bind custom events, used at init
		**/
		bindEvents : function bindEvents() {
			var imgCropper = this;

			imgCropper.bind('render', function() {
				imgCropper._setCroppingArea();
				// imgCropper._handleEventListeners();
			});
		},

		/**
		 * Cropping area configuration
		**/
		_setCroppingArea : function _setCroppingArea() {
			var imgCropper = this,
				canvasEl = imgCropper.element.getElementsByTagName('canvas')[0],
				ctx = canvasEl.getContext('2d'),
				img = imgCropper.image;

			imgCropper.canvas.ctx = ctx;
			imgCropper.canvas.ctx.drawImage(img.file, coordX, coordY, img.width, img.height);
		},

		/**
		 * Handle dom event listeners
		**/
		_handleEventListeners : function _handleEventListeners() {
			var imgCropper = this,
				cropperEl = imgCropper.element;
		}

	}

});