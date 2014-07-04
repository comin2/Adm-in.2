
if (!('webkitSpeechRecognition' in window)) {
	console.log('Your browser doesn\'t support speech recognition. That\‘s too bad…');
}
else {
	var recognition = new webkitSpeechRecognition();
	recognition.continuous = true;
	recognition.interimResults = true;
	recognition.lang = Admin2.html.lang || navigator.language;

	recognition.onstart = function(event) {
		// console.log(event);
		console.log('Je vous écoute…');

		recognition.onresult = function(event) {
			// console.log(event);

			interim_transcript = '';

			for (var i = event.resultIndex, nb = event.results.length; i < nb; ++i) {
				interim_transcript += event.results[i][0].transcript;
				if (event.results[i] && event.results[i].isFinal) {
					console.log('Final');
					processSpeech(interim_transcript);
				}
			}
		}
		recognition.onerror = function(event) {
			// console.log(event);
		}
	}
	recognition.onend = function(event) {
		console.log(event);
		console.log('Au revoir');
		// recognition.start();
	}

	recognition.start();
}

if(typeof Admin2.SPEECH_KEYWORDS !== "object") {
	Admin2.SPEECH_KEYWORDS = {};
}
if(typeof SPEECH_PROCESSES !== "object") {
	Admin2.SPEECH_PROCESSES = {};
}

Admin2.SPEECH_KEYWORDS.search = new RegExp(/^(je )?(re)?cherche /gi);

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