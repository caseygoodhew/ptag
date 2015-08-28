'use strict';

Pixate.Api = Pixate.Api || {};

Pixate.Api.Colors = {
	Named: {
		AliceBlue : true,
		AntiqueWhite : true,
		Aqua : true,
		Aquamarine : true,
		Azure : true,
		Beige : true,
		Bisque : true,
		Black : true,
		BlanchedAlmond : true,
		Blue : true,
		BlueViolet : true,
		Brown : true,
		BurlyWood : true,
		CadetBlue : true,
		Chartreuse : true,
		Chocolate : true,
		Coral : true,
		CornflowerBlue : true,
		Cornsilk : true,
		Crimson : true,
		Cyan : true,
		DarkBlue : true,
		DarkCyan : true,
		DarkGoldenRod : true,
		DarkGray : true,
		DarkGreen : true,
		DarkKhaki : true,
		DarkMagenta : true,
		DarkOliveGreen : true,
		DarkOrange : true,
		DarkOrchid : true,
		DarkRed : true,
		DarkSalmon : true,
		DarkSeaGreen : true,
		DarkSlateBlue : true,
		DarkSlateGray : true,
		DarkTurquoise : true,
		DarkViolet : true,
		DeepPink : true,
		DeepSkyBlue : true,
		DimGray : true,
		DodgerBlue : true,
		FireBrick : true,
		FloralWhite : true,
		ForestGreen : true,
		Fuchsia : true,
		Gainsboro : true,
		GhostWhite : true,
		Gold : true,
		GoldenRod : true,
		Gray : true,
		Green : true,
		GreenYellow : true,
		HoneyDew : true,
		HotPink : true,
		IndianRed  : true,
		Indigo  : true,
		Ivory : true,
		Khaki : true,
		Lavender : true,
		LavenderBlush : true,
		LawnGreen : true,
		LemonChiffon : true,
		LightBlue : true,
		LightCoral : true,
		LightCyan : true,
		LightGoldenRodYellow : true,
		LightGray : true,
		LightGreen : true,
		LightPink : true,
		LightSalmon : true,
		LightSeaGreen : true,
		LightSkyBlue : true,
		LightSlateGray : true,
		LightSteelBlue : true,
		LightYellow : true,
		Lime : true,
		LimeGreen : true,
		Linen : true,
		Magenta : true,
		Maroon : true,
		MediumAquaMarine : true,
		MediumBlue : true,
		MediumOrchid : true,
		MediumPurple : true,
		MediumSeaGreen : true,
		MediumSlateBlue : true,
		MediumSpringGreen : true,
		MediumTurquoise : true,
		MediumVioletRed : true,
		MidnightBlue : true,
		MintCream : true,
		MistyRose : true,
		Moccasin : true,
		NavajoWhite : true,
		Navy : true,
		OldLace : true,
		Olive : true,
		OliveDrab : true,
		Orange : true,
		OrangeRed : true,
		Orchid : true,
		PaleGoldenRod : true,
		PaleGreen : true,
		PaleTurquoise : true,
		PaleVioletRed : true,
		PapayaWhip : true,
		PeachPuff : true,
		Peru : true,
		Pink : true,
		Plum : true,
		PowderBlue : true,
		Purple : true,
		RebeccaPurple : true,
		Red : true,
		RosyBrown : true,
		RoyalBlue : true,
		SaddleBrown : true,
		Salmon : true,
		SandyBrown : true,
		SeaGreen : true,
		SeaShell : true,
		Sienna : true,
		Silver : true,
		SkyBlue : true,
		SlateBlue : true,
		SlateGray : true,
		Snow : true,
		SpringGreen : true,
		SteelBlue : true,
		Tan : true,
		Teal : true,
		Thistle : true,
		Tomato : true,
		Turquoise : true,
		Violet : true,
		Wheat : true,
		White : true,
		WhiteSmoke : true,
		Yellow : true,
		YellowGreen : true
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
