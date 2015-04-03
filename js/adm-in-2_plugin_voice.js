
if (!('webkitSpeechRecognition' in window)) {
	console.error('Your browser doesn\'t support speech recognition. That\‘s too bad…');
}
else {
	Admin2.voiceRecognition = new webkitSpeechRecognition();
	Admin2.voiceRecognition.continuous = true;
	Admin2.voiceRecognition.interimResults = true;
	Admin2.voiceRecognition.lang = Admin2.html.lang || navigator.language;

	Admin2.voiceRecognition.onstart = function(event) {
		// console.log(event);
		console.log('I am listening…');

		Admin2.voiceRecognition.onresult = function(event) {
			// console.log(event);

			interim_transcript = '';

			for (var i = event.resultIndex, nb = event.results.length; i < nb; ++i) {
				interim_transcript += event.results[i][0].transcript;
				if (event.results[i] && event.results[i].isFinal) {
					console.log('Final word');
					processSpeech(interim_transcript);
				}
			}
		}
		Admin2.voiceRecognition.onerror = function(event) {
			// console.log(event);
		}
	}
	Admin2.voiceRecognition.onend = function(event) {
		console.log(event);
		console.log('Goodbye');
	}

	if (Admin2.activateVoicePlugin) {
		Admin2.voiceRecognition.start();
	}

	if (typeof Admin2.SPEECH_KEYWORDS !== "object") {
		Admin2.SPEECH_KEYWORDS = {};
	}
	if (typeof SPEECH_PROCESSES !== "object") {
		Admin2.SPEECH_PROCESSES = {};
	}

	Admin2.SPEECH_KEYWORDS.search = new RegExp(/^(search(ing)?|looking for) /gi);

	Admin2.SPEECH_PROCESSES.search = function(searchStr, keyword, regexp) {
		console.log('Search: "'+searchStr+'"');

		if (!searchStr) {
			return false;
		}
		sidebar_search_input.value = '';
		sidebar_search_input.value = searchStr;

		sidebar_search_form.submit();
	};

	Admin2.processSpeech = function (speechStr) {
		var results;
		speechStr = speechStr.trim();
		console.log('Process speech : '+speechStr);

		for (var i in Admin2.SPEECH_KEYWORDS) {
			results = speechStr.match(Admin2.SPEECH_KEYWORDS[i]);
			console.dir(results);
			if(results) {
				Admin2.SPEECH_PROCESSES[i](speechStr.replace(results[0], '').trim(), results[0], Admin2.SPEECH_KEYWORDS[i]);
			}
		}
	}
}