'use strict';

Pixate.Api = Pixate.Api || {};

Pixate.Api.Types = {
	Interaction: {
		Drag: { 
			type: 'drag', 
			handler: 'createDragInteraction', 
			events: {
				position: 'dragPosition',
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
				rotate: 'rotate',
				start: 'rotateStart',
				release: 'rotateRelease'
			} 
		},
		Pinch: { 
			type: 'pinch', 
			handler: 'createPinchInteraction', 
			events: {
				pinch: 'pinch',
				start: 'pinchStart',
				release: 'pinchRelease'
			} 
		},
		Scroll: { 
			type: 'scroll', 
			handler: 'createScrollInteraction', 
			events: {
				postion: 'scrollPosition',
				start: 'scrollStart',
				release: 'scrollRelease',
				end: 'scrollEnd'
			} 
		}
	},

	Animation: {
		Move: { type: 'move', handler: 'createMoveAnimation' },
        Rotate: { type: 'rotate', handler: 'createRotateAnimation' },
        Scale: { type: 'scale', handler: 'createScaleAnimation' },
        Fade: { type: 'fade', handler: 'createFadeAnimation' },
        Color: { type: 'color', handler: 'createColorAnimation' },
        Image: { type: 'image', handler: 'createImageAnimation' },
        Reorder: { type: 'reorder', handler: 'createReorderAnimation' },
	}
};
