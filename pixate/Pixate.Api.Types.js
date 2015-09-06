'use strict';

Pixate.Api = Pixate.Api || {};

Pixate.Api.Types = {};

Pixate.Api.Types.Animation = {
	Move: { type: 'move', handler: 'createMoveAnimation' },
    Rotate: { type: 'rotate', handler: 'createRotateAnimation' },
    Scale: { type: 'scale', handler: 'createScaleAnimation' },
    Fade: { type: 'fade', handler: 'createFadeAnimation' },
    Color: { type: 'color', handler: 'createColorAnimation' },
    Image: { type: 'image', handler: 'createImageAnimation' },
    Reorder: { type: 'reorder', handler: 'createReorderAnimation' },
};
	
Pixate.Api.Types.Interaction = {
	Drag: { 
		type: 'drag', 
		handler: 'createDragInteraction', 
		events: {
			position: { name: 'dragPosition', defaultAnimation: { type: Pixate.Api.Types.Animation.Move, name: 'Move w/ Drag' }, canAnimate: false },
			start: 'dragStart',
			release: 'dragRelease'
		}
 	},
	Tap: { 
		type: 'tap', 
		handler: 'createTapInteraction', 
		events: {
			tap: 'tap',
		}
	},
	DoubleTap: { 
		type: 'doubletap', 
		handler: 'createDoubleTapInteraction', 
		events: {
			doubleTap: 'doubletap'
		}
	},
	LongPress: { 
		type: 'longpress', 
		handler: 'createLongPressInteraction', 
		events: {
			longPress: 'longpress'
		} 
	},
	Rotate: { 
		type: 'rotate', 
		handler: 'createRotateInteraction', 
		events: {
			rotate: { name: 'rotate', defaultAnimation: { type: Pixate.Api.Types.Animation.Rotate, name: 'Turn w/ Rotate' } },
			start: 'rotateStart',
			release: 'rotateRelease'
		} 
	},
	Pinch: { 
		type: 'pinch', 
		handler: 'createPinchInteraction', 
		events: {
			pinch: { name: 'pinch', defaultAnimation: { type: Pixate.Api.Types.Animation.Resize, name: 'Resize w/ Pinch' } },
			start: 'pinchStart',
			release: 'pinchRelease'
		} 
	},
	Scroll: {
		type: 'scroll', 
		handler: 'createScrollInteraction', 
		events: {
			postion: { name: 'scrollPosition', defaultAnimation: { type: Pixate.Api.Types.Animation.Scroll, name: 'Scroll w/ Drag' } },
			start: 'scrollStart',
			release: 'scrollRelease',
			end: 'scrollEnd'
		} 
	}
};
