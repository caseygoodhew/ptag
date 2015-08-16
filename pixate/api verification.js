(function() {

	var result = [];

	var allGood = true;

	for (var x in Pixate.Api) {
		
		if (!Pixate.Api[x].custom) {

			result.push('<div style="margin-left: 16px;">');
			result.push('<span>' + x + ': </span>');
			
			if (Pixate[x]) {
				result.push('<span style="color:green">OK</span>')
			} else {
				allGood = false;

				var fn = [];
				var parameters = [];
				var asserts = [];
				var tab = '&nbsp;&nbsp;&nbsp;&nbsp;';
				
				Pixate.each(Pixate.Api[x].parameterNames, function(parameterName, index) {
					if (index) { parameters.push(', '); }
					parameters.push(parameterName);

					if (parameterName === 'name') {
						asserts.push(tab + "Pixate.Assert.isText(name, 'name');")
					} else if (parameterName === 'layer') {
						asserts.push(tab + "Pixate.Assert.isLayer(layer, 'layer');")
					} else if (parameterName === 'animation') {
						asserts.push(tab + "Pixate.Assert.isAnimation(animation, 'animation');")
					}
				});

				fn.push('function(' + parameters.join('') + ') {');
					
				if (asserts.length) {
					fn.push(asserts.join('<br>'));

					fn.push('');
				}
				
				var returnValue = Pixate.Api[x].returnType ? 'return ' : '';
				fn.push(tab + returnValue + "executeCommand('"+x+"', ["+parameters.join('')+"]);")

				fn.push('},');

				result.push('<span style="color:red">');
				result.push(fn.join('<br>'));
				result.push('</span>');
			}

			result.push('</div>');
		}
	}

	if (allGood) {
		Pixate.log('<div>Pixate API Verification: <span style="color:green">OK</span></div>')
	} else {
		Pixate.log('<div>Pixate API Verification</div>' + result.join(''));
	}

})();