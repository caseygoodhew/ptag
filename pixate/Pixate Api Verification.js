(function() {

	var result = [];

	var allGood = false;

	var exclude = { 'Enums': true, 'Properties': true, 'Types': true };

	for (var x in Pixate.Api) {
		
		if (!exclude[x]) {

			result.push('<div style="margin-left: 16px;">');
			result.push('<span><a target="pixate_api" href="http://www.pixate.com/docs/actions/#' + x.toLowerCase() + '">'+x+'</a>: </span>');

			if (Pixate[x] && Pixate.Api[x].tested) {
				result.push('<span class="success">Has tests</span>');
			} else if (Pixate[x]) {
				result.push('<span style="color:blue">Not Tested</span>');
				allGood = false;
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
		result.push('<span class="success">OK</span>');
	}
	
	Pixate.log('<div>Pixate API Verification: ' + result.join('') + '</div>', true);

})();