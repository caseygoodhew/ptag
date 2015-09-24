'use strict';

Pixate.Api = Pixate.Api || {};

Pixate.Api.Types = {};

Pixate.Api.Types.Animation = {
	Move: { type: 'move', defaultName: 'Move', handler: 'createMoveAnimation' },
    Rotate: { type: 'rotate', defaultName: 'Rotate', handler: 'createRotateAnimation' },
    Scale: { type: 'scale', defaultName: 'Scale', handler: 'createScaleAnimation' },
    Fade: { type: 'fade', defaultName: 'Fade', handler: 'createFadeAnimation' },
    Color: { type: 'color', defaultName: 'Color', handler: 'createColorAnimation' },
    Image: { type: 'image', defaultName: 'Image', handler: 'createImageAnimation' },
    Reorder: { type: 'reorder', defaultName: 'Reorder Layer', handler: 'createReorderAnimation' },
};
	
Pixate.Api.Types.Interaction = {
	Drag: { 
		type: 'drag', 
		handler: 'createDragInteraction', 
		events: {
			position: { 
				name: 'dragPosition', 
				defaultAnimation: { type: Pixate.Api.Types.Animation.Move.type, name: 'Move w/ Drag', animates: Pixate.AnimationMode.continuousWithRate }, 
				canAnimate: false 
			},
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
			rotate: { 
				name: 'rotate', 
				defaultAnimation: { type: Pixate.Api.Types.Animation.Rotate.type, name: 'Turn w/ Rotate', animates: Pixate.AnimationMode.continuousWithRate } 
			},
			start: 'rotateStart',
			release: 'rotateRelease'
		} 
	},
	Pinch: { 
		type: 'pinch', 
		handler: 'createPinchInteraction', 
		events: {
			pinch: { 
				name: 'pinch', 
				defaultAnimation: { type: Pixate.Api.Types.Animation.Scale.type, name: 'Resize w/ Pinch', animates: Pixate.AnimationMode.continuousWithRate } 
			},
			start: 'pinchStart',
			release: 'pinchRelease'
		} 
	},
	Scroll: {
		type: 'scroll', 
		handler: 'createScrollInteraction', 
		events: {
			postion: { 
				name: 'scrollPosition', 
				defaultAnimation: { type: Pixate.Api.Types.Animation.Move.type, name: 'Scroll w/ Drag', animates: Pixate.AnimationMode.continuousWithRate } 
			},
			start: 'scrollStart',
			release: 'scrollRelease',
			end: 'scrollEnd'
		} 
	}
};
