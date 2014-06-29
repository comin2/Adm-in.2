var Admin2 = {
	html: document.documentElement,
	body: document.body,
	topbar: document.getElementById('topbar'),
	sidebar: document.getElementById('sidebar'),
	main: document.getElementById('main'),
	config: {
		max_toasts_number: 5
	}
}


Admin2.sidebar_toogle_btn = document.createElement('button');
Admin2.sidebar_toogle_btn.setAttribute('type', 'button');
Admin2.sidebar_toogle_btn.id = 'sidebar-toggle';

Admin2.main_overlay = document.createElement('div');
Admin2.main_overlay.id = 'main-overlay';
if (Admin2.main.nextSibling) {
	Admin2.main.parentNode.insertBefore(Admin2.main_overlay, Admin2.main.nextSibling);
}
else {
	Admin2.main.parentNode.appendChild(Admin2.main_overlay);
}

if(Admin2.body.insertBefore(Admin2.sidebar_toogle_btn, Admin2.sidebar)){
	Admin2.sidebar.setAttribute('hidden', true);
	Admin2.sidebar.setAttribute('aria-hidden', true);

	Admin2.sidebar_toogle_btn.title = 'Show the sidebar';

	Admin2.html.classList.add('sidebar-hidden');
}

Admin2.sidebar_search_form = document.getElementById('sidebar-search-form');
Admin2.sidebar_search_input = document.getElementById('sidebar-search-input');

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

Admin2.sidebar_menu_titles = Admin2.sidebar.getElementsByClassName('menu-title');

Admin2.html.classList.add('js-enabled');


Admin2.sidebar_header = document.getElementById('sidebar-header');

Admin2.sidebar_header.title = 'Afficher/Cacher le menu latéral';

for (var i=0, nb=Admin2.sidebar_menu_titles.length; i<nb; i++) {
	var toggle_btn = document.createElement('button');
	toggle_btn.type = 'button';
	toggle_btn.className = 'menu-toggle';

	var elem = Admin2.sidebar_menu_titles[i];
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

	Admin2.sidebar_menu_titles[i].insertBefore(toggle_btn, Admin2.sidebar_menu_titles[i].firstElementChild);
	Admin2.sidebar_menu_titles[i].appendChild(toggle_btn);
}

Admin2.onDocumentClick = function (event){
	if (event.target.id === 'sidebar-toggle') {
		event.stopPropagation();
		if (Admin2.sidebar.getAttribute('hidden')) {
			Admin2.sidebar.removeAttribute('hidden');
			Admin2.sidebar.removeAttribute('aria-hidden');
			Admin2.sidebar_toogle_btn.title = 'Hide the sidebar';
			Admin2.html.classList.remove('sidebar-hidden');
		}
		else {
			Admin2.sidebar.setAttribute('hidden', true);
			Admin2.sidebar.setAttribute('aria-hidden', true);
			Admin2.sidebar_toogle_btn.title = 'Show the sidebar';
			Admin2.html.classList.add('sidebar-hidden');
		}

		if(event.x || event.y) {
			event.target.blur();
		}

		return true;
	}
	if (event.target.classList.contains('menu-toggle')) {
		event.stopPropagation();
		var elem = event.target.parentNode;

		while ((!elem.classList || !elem.classList.contains('menu-content')) && elem.nextSibling) {
			elem = elem.nextSibling;
		}

		if (!elem.classList.contains('menu-content')) {
			return false;
		}

		if (elem.getAttribute('hidden') || elem.getAttribute('aria-hidden')) {
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
		
		if(event.x || event.y) {
			event.target.blur();
		}
		
		return true;
	}
}

document.addEventListener('click', Admin2.onDocumentClick, false);


