Class(App.UI, 'StageCropper').inherits(App.Widget)({

	ELEMENT_CLASS : 'stage-cropper',

	HTML : '<canvas></canvas>',

	prototype : {

		/**
		 * Initial cropper variables
		**/
		imageSrc : null,
		screenHeight : 300,
		screenWidth : 300,
		screenPosX : 50,
		screenPosY : 50,
		maskColor : 'rgba(255, 255, 255, .75)',

		/**
		 * Constructor that handles widget configuration
		**/
		init : function init(config) {
			var cropper = this;
			App.Widget.prototype.init.call(cropper, config);
			cropper._bindEvents();
		},

		/**
		 * Bind custom events, used at init
		 * - Configure canvas once widget is rendered
		**/
		_bindEvents : function _bindEvents() {
			var cropper = this;
			cropper.bind('render', function() {
				cropper.loadImage(cropper.imageSrc);
			});
		},

		/**
		 * Creates a new image to crop by getting the
		 * source set in the config instantiation
		**/
		loadImage : function loadImage(src) {
			var cropper = this,
				img = new Image();
			img.onload = function () {
				cropper.canvasImg = img;
				cropper.setupCanvas();
			};
			img.src = src;
		},

		/**
		 * Configure canvas element and context
		 * - Sets canvas size depending on parent element
		 * - Draws a mask on context
		**/
		setupCanvas : function setupCanvas() {
			var cropper = this,
				canvasEl  = cropper.element,
				img = cropper.canvasImg,
				ctx;

			cropper.canvasCtx = canvasEl.getContext('2d');
			ctx = cropper.canvasCtx;
			canvasEl.width = canvasEl.parentNode.offsetWidth;
			canvasEl.height = canvasEl.parentNode.offsetHeight;

			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
			ctx.drawImage(img, 0, 0, img.width, img.height);
			ctx.fillStyle = cropper.maskColor;
			ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
			ctx.strokeStyle = '#000';
			ctx.lineWidth = 2;

			ctx.strokeRect(
				cropper.screenPosX,
				cropper.screenPosY,
				cropper.screenWidth,
				cropper.screenHeight
			);
		},

		/**
		 * Repaint the image in the screen depending its
		 * positioning and zoom
		**/
		refreshScreen : function refreshScreen() {

		}

	}

});