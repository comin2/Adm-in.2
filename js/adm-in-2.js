var sidebar = document.getElementById('sidebar');

var sidebar_toogle_btn = document.createElement('button');
sidebar_toogle_btn.setAttribute('type', 'button');
sidebar_toogle_btn.id = 'sidebar-toggle';

if(document.body.insertBefore(sidebar_toogle_btn, sidebar)){
	sidebar.setAttribute('hidden', true);
	sidebar.setAttribute('aria-hidden', true);

	sidebar_toogle_btn.title = 'Show the sidebar';
	sidebar_toogle_btn.classList.add('sidebar-hidden');
}

var sidebar_search_form = document.getElementById('sidebar-search-form');
var sidebar_search_input = document.getElementById('sidebar-search-input');
if (!('webkitSpeechRecognition' in window)) {
	console.log('Your browser doesn\'t support speech recognition. That\‘s too bad…');
}
else {
	var recognition = new webkitSpeechRecognition();
	recognition.continuous = true;
	recognition.interimResults = true;
	recognition.lang = document.documentElement.lang || navigator.language;

	recognition.onstart = function(event) {
		console.log(event);
	}
	recognition.onresult = function(event) {
		console.log(event);

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
		console.log(event);
	}
	recognition.onend = function(event) {
		console.log(event);
		recognition.start();
	}

	recognition.start();
}

if(typeof SPEECH_KEYWORDS !== "object") {
	SPEECH_KEYWORDS = {};
}
if(typeof SPEECH_PROCESSES !== "object") {
	SPEECH_PROCESSES = {};
}

SPEECH_KEYWORDS.search = new RegExp(/^(je )?(re)?cherche /gi);

SPEECH_PROCESSES.search = function(searchStr, keyword, regexp) {
	console.log('Search: "'+searchStr+'"');

	if (!searchStr) {
		return false;
	}
	sidebar_search_input.value = '';
	sidebar_search_input.value = searchStr;

	sidebar_search_form.submit();
};

function processSpeech (speechStr) {
	var results;
	speechStr = speechStr.trim();
	console.log('Process speech : '+speechStr);

	for (var i in SPEECH_KEYWORDS) {
		results = speechStr.match(SPEECH_KEYWORDS[i]);
		console.dir(results);
		if(results) {
			SPEECH_PROCESSES[i](speechStr.replace(results[0], '').trim(), results[0], SPEECH_KEYWORDS[i]);
		}
	}
}

var sidebar_menu_titles = document.querySelectorAll('#sidebar .menu>.menu-title');

document.body.classList.add('js-enabled');

document.getElementById('sidebar-header').title = 'Afficher/Cacher le menu latéral';

for (var i=0, nb=sidebar_menu_titles.length; i<nb; i++) {
	var toggle_btn = document.createElement('button');
	toggle_btn.type = 'button';
	toggle_btn.className = 'menu-toggle';

	var elem = sidebar_menu_titles[i];
	while ((!elem.classList || !elem.classList.contains('menu-content')) && elem.nextSibling) {
		elem = elem.nextSibling;
	}
	if (elem.getAttribute('hidden')) {
		toggle_btn.textContent = '+';
		toggle_btn.title = 'Show the content of this menu';
	}
	else {
		toggle_btn.textContent = '-';
		toggle_btn.title = 'Hide the content of this menu';
	}

	sidebar_menu_titles[i].insertBefore(toggle_btn, sidebar_menu_titles[i].firstElementChild);
	sidebar_menu_titles[i].appendChild(toggle_btn);
}

function admin2DocumentClick(event){
	if (event.target.id === 'sidebar-toggle') {
		if (sidebar.getAttribute('hidden')) {
			sidebar.removeAttribute('hidden');
			sidebar.removeAttribute('aria-hidden');
			sidebar_toogle_btn.title = 'Hide the sidebar';
			sidebar_toogle_btn.classList.remove('sidebar-hidden');
		}
		else {
			sidebar.setAttribute('hidden', true);
			sidebar.setAttribute('aria-hidden', true);
			sidebar_toogle_btn.title = 'Show the sidebar';
			sidebar_toogle_btn.classList.add('sidebar-hidden');
		}
		// event.target.blur();
		return true;
	}
	if (event.target.classList.contains('menu-toggle')) {
		event.stopPropagation();
		var elem = event.target.parentNode;

		// console.dir(e);

		while ((!elem.classList || !elem.classList.contains('menu-content')) && elem.nextSibling) {
			elem = elem.nextSibling;
		}

		if (!elem.classList.contains('menu-content')) {
			return false;
		}

		if (elem.getAttribute('hidden')) {
			elem.removeAttribute('hidden');
			elem.removeAttribute('aria-hidden');
			event.target.textContent = '-';
			event.target.title = 'Hide the content of this menu';
		}
		else {
			elem.setAttribute('hidden', true);
			elem.setAttribute('aria-hidden', true);
			event.target.textContent = '+';
			event.target.title = 'Show the content of this menu';
		}
		return true;
	}
}

document.addEventListener('click', admin2DocumentClick, true);