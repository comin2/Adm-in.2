var sidebar = document.querySelector('#sidebar');
var sidebar_menu_titles = document.querySelectorAll('#sidebar .menu>.menu-title');

document.body.classList.add('js-enabled');

document.getElementById('sidebar-header').title = 'Afficher/Cacher le menu latéral';

for (var i=0, nb=sidebar_menu_titles.length; i<nb; i++) {
	var toggle_btn = document.createElement('button');
	toggle_btn.type = 'button';
	toggle_btn.textContent = '-';
	toggle_btn.title = 'Cacher le contenu de ce menu';
	toggle_btn.className = 'menu-toggle';

	sidebar_menu_titles[i].insertBefore(toggle_btn, sidebar_menu_titles[i].firstElementChild);
	sidebar_menu_titles[i].appendChild(toggle_btn);
}

function admin2DocumentClick(e){
	if (e.target.id === 'sidebar-header') {
		if (sidebar.getAttribute('hidden')) {
			sidebar.removeAttribute('hidden');
			sidebar.removeAttribute('aria-hidden');
		}
		else {
			sidebar.setAttribute('hidden', true);
			sidebar.setAttribute('aria-hidden', true);
		}
		e.target.blur();
		return true;
	}
	if (e.target.classList.contains('menu-toggle')) {
		e.stopPropagation();
		var elem = e.target.parentNode;

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
			e.target.textContent = '-';
			e.target.title = 'Cacher le contenu de ce menu';
		}
		else {
			elem.setAttribute('hidden', true);
			elem.setAttribute('aria-hidden', true);
			e.target.textContent = '+';
			e.target.title = 'Afficher le contenu de ce menu';
		}
		return true;
	}
}

document.addEventListener('click', admin2DocumentClick, true);