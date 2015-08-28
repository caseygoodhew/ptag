'use strict';

Pixate.Api = Pixate.Api || {};

Pixate.Api.Colors = {
	Named: {
		AliceBlue: 'AliceBlue',
		AntiqueWhite: 'AntiqueWhite',
		Aqua: 'Aqua',
		Aquamarine: 'Aquamarine',
		Azure: 'Azure',
		Beige: 'Beige',
		Bisque: 'Bisque',
		Black: 'Black',
		BlanchedAlmond: 'BlanchedAlmond',
		Blue: 'Blue',
		BlueViolet: 'BlueViolet',
		Brown: 'Brown',
		BurlyWood: 'BurlyWood',
		CadetBlue: 'CadetBlue',
		Chartreuse: 'Chartreuse',
		Chocolate: 'Chocolate',
		Coral: 'Coral',
		CornflowerBlue: 'CornflowerBlue',
		Cornsilk: 'Cornsilk',
		Crimson: 'Crimson',
		Cyan: 'Cyan',
		DarkBlue: 'DarkBlue',
		DarkCyan: 'DarkCyan',
		DarkGoldenRod: 'DarkGoldenRod',
		DarkGray: 'DarkGray',
		DarkGreen: 'DarkGreen',
		DarkKhaki: 'DarkKhaki',
		DarkMagenta: 'DarkMagenta',
		DarkOliveGreen: 'DarkOliveGreen',
		DarkOrange: 'DarkOrange',
		DarkOrchid: 'DarkOrchid',
		DarkRed: 'DarkRed',
		DarkSalmon: 'DarkSalmon',
		DarkSeaGreen: 'DarkSeaGreen',
		DarkSlateBlue: 'DarkSlateBlue',
		DarkSlateGray: 'DarkSlateGray',
		DarkTurquoise: 'DarkTurquoise',
		DarkViolet: 'DarkViolet',
		DeepPink: 'DeepPink',
		DeepSkyBlue: 'DeepSkyBlue',
		DimGray: 'DimGray',
		DodgerBlue: 'DodgerBlue',
		FireBrick: 'FireBrick',
		FloralWhite: 'FloralWhite',
		ForestGreen: 'ForestGreen',
		Fuchsia: 'Fuchsia',
		Gainsboro: 'Gainsboro',
		GhostWhite: 'GhostWhite',
		Gold: 'Gold',
		GoldenRod: 'GoldenRod',
		Gray: 'Gray',
		Green: 'Green',
		GreenYellow: 'GreenYellow',
		HoneyDew: 'HoneyDew',
		HotPink: 'HotPink',
		IndianRed : 'IndianRed ',
		Indigo : 'Indigo ',
		Ivory: 'Ivory',
		Khaki: 'Khaki',
		Lavender: 'Lavender',
		LavenderBlush: 'LavenderBlush',
		LawnGreen: 'LawnGreen',
		LemonChiffon: 'LemonChiffon',
		LightBlue: 'LightBlue',
		LightCoral: 'LightCoral',
		LightCyan: 'LightCyan',
		LightGoldenRodYellow: 'LightGoldenRodYellow',
		LightGray: 'LightGray',
		LightGreen: 'LightGreen',
		LightPink: 'LightPink',
		LightSalmon: 'LightSalmon',
		LightSeaGreen: 'LightSeaGreen',
		LightSkyBlue: 'LightSkyBlue',
		LightSlateGray: 'LightSlateGray',
		LightSteelBlue: 'LightSteelBlue',
		LightYellow: 'LightYellow',
		Lime: 'Lime',
		LimeGreen: 'LimeGreen',
		Linen: 'Linen',
		Magenta: 'Magenta',
		Maroon: 'Maroon',
		MediumAquaMarine: 'MediumAquaMarine',
		MediumBlue: 'MediumBlue',
		MediumOrchid: 'MediumOrchid',
		MediumPurple: 'MediumPurple',
		MediumSeaGreen: 'MediumSeaGreen',
		MediumSlateBlue: 'MediumSlateBlue',
		MediumSpringGreen: 'MediumSpringGreen',
		MediumTurquoise: 'MediumTurquoise',
		MediumVioletRed: 'MediumVioletRed',
		MidnightBlue: 'MidnightBlue',
		MintCream: 'MintCream',
		MistyRose: 'MistyRose',
		Moccasin: 'Moccasin',
		NavajoWhite: 'NavajoWhite',
		Navy: 'Navy',
		OldLace: 'OldLace',
		Olive: 'Olive',
		OliveDrab: 'OliveDrab',
		Orange: 'Orange',
		OrangeRed: 'OrangeRed',
		Orchid: 'Orchid',
		PaleGoldenRod: 'PaleGoldenRod',
		PaleGreen: 'PaleGreen',
		PaleTurquoise: 'PaleTurquoise',
		PaleVioletRed: 'PaleVioletRed',
		PapayaWhip: 'PapayaWhip',
		PeachPuff: 'PeachPuff',
		Peru: 'Peru',
		Pink: 'Pink',
		Plum: 'Plum',
		PowderBlue: 'PowderBlue',
		Purple: 'Purple',
		RebeccaPurple: 'RebeccaPurple',
		Red: 'Red',
		RosyBrown: 'RosyBrown',
		RoyalBlue: 'RoyalBlue',
		SaddleBrown: 'SaddleBrown',
		Salmon: 'Salmon',
		SandyBrown: 'SandyBrown',
		SeaGreen: 'SeaGreen',
		SeaShell: 'SeaShell',
		Sienna: 'Sienna',
		Silver: 'Silver',
		SkyBlue: 'SkyBlue',
		SlateBlue: 'SlateBlue',
		SlateGray: 'SlateGray',
		Snow: 'Snow',
		SpringGreen: 'SpringGreen',
		SteelBlue: 'SteelBlue',
		Tan: 'Tan',
		Teal: 'Teal',
		Thistle: 'Thistle',
		Tomato: 'Tomato',
		Turquoise: 'Turquoise',
		Violet: 'Violet',
		Wheat: 'Wheat',
		White: 'White',
		WhiteSmoke: 'WhiteSmoke',
		Yellow: 'Yellow',
		YellowGreen: 'YellowGreen'
	},

	RegEx: {
		transparent: /^transparent$/i,
		rbg: /^rgb\(\s*\d{1,3},\s*\d{1,3},\s*\d{1,3}\s*\)$/i,
		rgba: /^rgba\(\s*\d{1,3},\s*\d{1,3},\s*\d{1,3},\s*(1(\.0+)?|(0?(\.\d+)?))\s*\)$/i,
		hsl: /^hsl\(\s*\d{1,3},\s*(100(\.0+)?|([0-9]{1,2}(\.\d+)?)),\s*(100(\.0+)?|([0-9]{1,2}(\.\d+)?))\s*\)$/i,
		hsla: /^hsla\(\s*\d{1,3},\s*(100(\.0+)?|([0-9]{1,2}(\.\d+)?)),\s*(100(\.0+)?|([0-9]{1,2}(\.\d+)?)),\s*(1(\.0+)?|(0?(\.\d+)?))\s*\)$/i,
		hex: /^#(([0-9a-f]{2}){3}|([0-9a-f]){3})$/i
	},

	matchesColorRegex: function(value) {
		var matches = false;

		for (var x in Pixate.Api.Colors.RegEx) {
			matches = matches || !!Pixate.Api.Colors.RegEx[x].test(value);
		};

		return matches;
	},

	isNamedColor: function(value) {
		if (value === 'map') {
			return false;
		}

		if (!Pixate.Api.Colors.Named.map) {
			var map = {};
			
			for (var x in Pixate.Api.Colors.Named) {
				map[x.toLowerCase()] = true;
			}

			Pixate.Api.Colors.Named.map = map;
		}

		return !!(Pixate.Api.Colors.Named.map[(value+'').toLowerCase()]);
	},

	isColor: function(value) {
		return Pixate.Api.Colors.isNamedColor(value) || Pixate.Api.Colors.matchesColorRegex(value);
	}
};
