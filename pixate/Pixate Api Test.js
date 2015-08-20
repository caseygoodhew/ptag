
//Mock.enable();

(function() {
	var tests = [{
		name: 'Exception test',
		test: function() {
			var a;
			return a.test.test;
		},
		fail: 'Wont fail'
	}, {
		name: 'Success test',
		test: function() {
			return true;
		},
		fail: 'Wont fail'
	}, {
		name: 'Fail test',
		test: function() {
			return false;
		},
		fail: 'Did fail'
	}];


	var fullResult = [];
	fullResult.push('<div>Pixate Api Test Results</div>')

	var testRunner = function(test, testId) {
		var result = test.test();

		var el = document.getElementById(testId);
		if (result) {
			el.className = 'test-success';
			el.innerHTML = 'OK';
		} else {
			el.className = 'test-fail';
			el.innerHTML = test.fail;
		}
	};

	Pixate.TestCounter = Pixate.TestCounter || 0;

	Pixate.each(tests, function(test) {
		
		Pixate.TestCounter++;
		var testId = 'test-' + Pixate.TestCounter;

		var testResult = [];
		testResult.push('<div class="test">');
		testResult.push('<span class="test-name">'+test.name+'</span>');
		testResult.push('<span class="test-spacing">: </span>');
		testResult.push('<span id="'+testId+'" class="test-pending"></span>');
		testResult.push('</div>');
		
		fullResult.push(testResult.join(''));

		setTimeout(function() { testRunner(test, testId); }, 1);
	});

	Pixate.log(fullResult.join(''));

	setTimeout(function() { 
		var els = document.getElementsByClassName('test-pending');
		for (var i = 0; i < els.length; i++) {
			var el = els[i];
			el.className = 'test-exception';
			el.innerHTML = 'Test failed to complete';
		};
	}, 1);
})();