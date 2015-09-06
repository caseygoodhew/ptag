'use strict';

Pixate.Api = Pixate.Api || {};
Pixate.Api.Enums = {};

try
{
	Pixate.Api.Enums.AnimationMode = AnimationMode;
}
catch (ex)
{
	Pixate.Api.Enums.AnimationMode = {
		continuousToValue: 'AnimationMode.continuousToValue',
		continuousWithRate: 'AnimationMode.continuousWithRate',
		withDuration: 'AnimationMode.withDuration'
	};
}

try
{
	Pixate.Api.Enums.ClippingType = ClippingType;
}
catch (ex)
{
	Pixate.Api.Enums.ClippingType = {
		none: 'ClippingType.none',
		bounds: 'ClippingType.bounds'
	};
}

try
{
	Pixate.Api.Enums.DragDirection = DragDirection;
}
catch (ex)
{
	Pixate.Api.Enums.DragDirection = {
		free: 'DragDirection.free',
		horizontal: 'DragDirection.horizontal',
		vertical: 'DragDirection.vertical'
	};
}

try
{
	Pixate.Api.Enums.PagingMode = PagingMode;
}
catch (ex)
{
	Pixate.Api.Enums.PagingMode = {
		none: 'PagingMode.none',
		paging: 'PagingMode.paging'
	};
}

try
{
	Pixate.Api.Enums.DimensionType = DimensionType;
}
catch (ex)
{
	Pixate.Api.Enums.DimensionType = {
		two: 'DimensionType.two',
		three: 'DimensionType.three'
	};
}

try
{
	Pixate.Api.Enums.Stacking = Stacking;
}
catch (ex)
{
	Pixate.Api.Enums.Stacking = {
		front: 'Stacking.front',
		back: 'Stacking.back',
		before: 'Stacking.before',
		behind: 'Stacking.behind'
	};
}

try
{
	Pixate.Api.Enums.ScaleType = ScaleType;
}
catch (ex)
{
	Pixate.Api.Enums.ScaleType = {
		byFactor: 'ScaleType.byfactor',
		toSize: 'ScaleType.toSize'
	};
}

try
{
	Pixate.Api.Enums.Edge = Edge;
}
catch (ex)
{
	Pixate.Api.Enums.Edge = {
		top: 'Edge.top',
		centerY: 'Edge.centerY',
		bottom: 'Edge.bottom',
		left: 'Edge.left',
		centerX: 'Edge.centerX',
		right: 'Edge.right'
	};
}

try
{
	Pixate.Api.Enums.EasingCurve = EasingCurve;
}
catch (ex)
{
	Pixate.Api.Enums.EasingCurve = {
		linear: 'EasingCurve.linear',
		spring: 'EasingCurve.spring',
		easeInQuadratic: 'EasingCurve.easeInQuadratic',
		easeInCubic: 'EasingCurve.easeInCubic',
		easeInQuartic: 'EasingCurve.easeInQuartic',
		easeInQuintic: 'EasingCurve.easeInQuintic',
		easeInSine: 'EasingCurve.easeInSine',
		easeInExponential: 'EasingCurve.easeInExponential',
		easeInCircular: 'EasingCurve.easeInCircular',
		easeInBounce: 'EasingCurve.easeInBounce',
		easeInBack: 'EasingCurve.easeInBack',
		easeOutQuadratic: 'EasingCurve.easeOutQuadratic',
		easeOutCubic: 'EasingCurve.easeOutCubic',
		easeOutQuartic: 'EasingCurve.easeOutQuartic',
		easeOutQuintic: 'EasingCurve.easeOutQuintic',
		easeOutSine: 'EasingCurve.easeOutSine',
		easeOutExponential: 'EasingCurve.easeOutExponential',
		easeOutCircular: 'EasingCurve.easeOutCircular',
		easeOutBounce: 'EasingCurve.easeOutBounce',
		easeOutBack: 'EasingCurve.easeOutBack',
		easeInOutQuadratic: 'EasingCurve.easeInOutQuadratic',
		easeInOutCubic: 'EasingCurve.easeInOutCubic',
		easeInOutQuartic: 'EasingCurve.easeInOutQuartic',
		easeInOutQuintic: 'EasingCurve.easeInOutQuintic',
		easeInOutSine: 'EasingCurve.easeInOutSine',
		easeInOutExponential: 'EasingCurve.easeInOutExponential',
		easeInOutCircular: 'EasingCurve.easeInOutCircular',
		easeInOutBounce: 'EasingCurve.easeInOutBounce',
		easeInOutBack: 'EasingCurve.easeInOutBack'
	};
}

Pixate.Api.Enums.AnchorX = {
	Left: 0,
	Center: 0.5,
	Right: 1,
	Default: 0.5
};

Pixate.Api.Enums.AnchorY = {
	Top: 0,
	Center: 0.5,
	Bottom: 1,
	Default: 0.5
};

Pixate.Api.Enums.AnchorZ = {
	Default: 0
};

Pixate.Api.Enums.Types = {
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

Pixate.apply(Pixate, Pixate.Api.Enums);


