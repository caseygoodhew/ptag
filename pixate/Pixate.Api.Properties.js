'use strict';

Pixate.Api = Pixate.Api || {};

Pixate.Api.Properties = function(){
	
	return {
		Layer: {
			id: { type: 'string', readOnly: true },
			name: { 
				type: 'string',
				validator: function(value) {
					if (!value) {
						return false;
					}

					if (typeof value === 'string') {
						return true;
					}

					if (typeof value === 'number') {
						return { warn: 'Layer name can be set as integer, but integer is not supported by getLayerByName' }
					}

					return false;
				}
			},
			x: { type: 'number' },
			y: { type: 'number' },
			left: { type: 'number' },
			top: { type: 'number' },
			centerX: { type: 'number' },
			centerY: { type: 'number' },
			right: { type: 'number' },
			bottom: { type: 'number' },
			width: { type: 'number' },
			height: { type: 'number' },
			rotation: { type: 'number' },
			scale: { type: 'number' },
			opacity: { type: 'number' },
			backgroundColor: { 
				type: 'string',
				validator: function(value) {
					if (!value || typeof value !== 'string') {
						return false;
					}

					return Pixate.Api.Colors.isColor(value);
				}
			},
			backgroundImage: { type: 'Asset' },
			clipping: { type: 'ClippingType' },
			animations: { type: 'Animation[]', readOnly: true }
		},

		Interaction: {
			id: { type: 'string', readOnly: true },
			type: { type: 'string', readOnly: true },
			min: { type: 'number' },
			minReferenceEdge: { type: 'Edge', forType: ['drag'] },
			max: { type: 'number' },
			maxReferenceEdge: { type: 'Edge', forType: ['drag'] },
			stretchMin : { type: 'number', min: 0, max: 10 },
			stretchMax : { type: 'number', min: 0, max: 10 },
			direction: { type: 'DragDirection', forType: ['drag'] },
			paging: { type: 'PagingMode', forType: ['paging'] }
		},

		Animation: {
			conditions: { type: 'AnimationCondition[]', readOnly: true }
		},

		AnimationCondition: {
			id: { type: 'string', readOnly: true },
			type: { type: 'string', readOnly: true },
			name: { type: 'string' },
			enabled: { type: 'boolean' },
			collapsed: { type: 'boolean' },
			animates: { type: 'AnimationMode' },
			basedOn: { type: 'InteractionEvent' },
			referenceEdge: { type: 'Edge', forInteraction: ['drag'] },
			begin: { type: 'number', forAnimationMode: [Pixate.AnimationMode.continuousToValue, Pixate.AnimationMode.continuousWithRate] },
			end: { type: 'number', forAnimationMode: [Pixate.AnimationMode.continuousToValue, Pixate.AnimationMode.continuousWithRate] },
			condition: { type: 'string', forAnimationMode: [Pixate.AnimationMode.withDuration] },
			to: [{ 
				type: 'Asset', 
				forType: ['image'], 
				forAnimationMode: [Pixate.AnimationMode.withDuration]
			}, { 
				type: 'Stacking ', 
				forType: ['reorder'], 
				forAnimationMode: [Pixate.AnimationMode.withDuration]
			}, {
				type: 'string', 
				forType: ['color'], 
				forAnimationMode: [Pixate.AnimationMode.withDuration]
			}],
			rate: { type: 'number', forType: ['move', 'scale', 'fade', 'color', 'image', 'reorder'], forAnimationMode: [Pixate.AnimationMode.continuousWithRate] },
			duration: [
				{ type: 'number', forType: ['image', 'color'], min: 0, max: 0, forAnimationMode: [Pixate.AnimationMode.withDuration] },
				{ type: 'number', forAnimationMode: [Pixate.AnimationMode.withDuration] }
			],
			delay: [
				{ type: 'number', forType: ['image', 'color'], min: 0, max: 0, forAnimationMode: [Pixate.AnimationMode.withDuration] },
				{ type: 'number', forAnimationMode: [Pixate.AnimationMode.withDuration] }
			],
			easing: { type: 'EasingCurve', forAnimationMode: [Pixate.AnimationMode.withDuration] },
			springTension: { type: 'number', min: 0, forAnimationMode: [Pixate.AnimationMode.withDuration] },
			springFriction: { type: 'number', min: 0, forAnimationMode: [Pixate.AnimationMode.withDuration] },
			toX: { type: 'number', forType: ['move', 'rotate', 'scale'], forAnimationMode: [Pixate.AnimationMode.continuousToValue, Pixate.AnimationMode.withDuration] },
			toY: { type: 'number', forType: ['move', 'rotate', 'scale'], forAnimationMode: [Pixate.AnimationMode.continuousToValue, Pixate.AnimationMode.withDuration] },
			toZ: { type: 'number', forType: ['rotate'], forAnimationMode: [Pixate.AnimationMode.continuousToValue, Pixate.AnimationMode.withDuration] },
			rateX: { type: 'number', forType: ['rotate'], forAnimationMode: [Pixate.AnimationMode.continuousWithRate] },
			rateY: { type: 'number', forType: ['rotate'], forAnimationMode: [Pixate.AnimationMode.continuousWithRate] },
			rateZ: { type: 'number', forType: ['rotate'], forAnimationMode: [Pixate.AnimationMode.continuousWithRate] },
			anchorX: { type: 'AnchorX', forType: ['rotate', 'scale'] },
			anchorY: { type: 'AnchorY', forType: ['rotate', 'scale'] },
			anchorZ: { type: 'AnchorZ', forType: ['rotate', 'scale'] },
			dimension: { type: 'DimensionType', forType: ['rotate'] },
			backLayer: { type: 'Layer', forType: ['rotate'] },
			target: { type: 'Layer', forType: ['reorder'] },
			scales: { type: 'ScaleType', forType: ['scale'] }
		}
	}
}();

Pixate.apply(Pixate.Api.Properties.Animation, Pixate.Api.Properties.AnimationCondition);


