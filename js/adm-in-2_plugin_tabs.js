Admin2.Tabs = {
	setAllTabs: function () {
		Array.prototype.forEach.call(document.getElementsByClassName('tabs-container'), Admin2.Tabs.setSingleTabs);
	},
	setSingleTabs: function (container) {
		Array.prototype.forEach.call(container.querySelectorAll('.tabs-names>a'), function (link, i) {
			link.addEventListener('click', Admin2.Tabs.showTab.bind(link, link.getAttribute('href')), false);
			if (i > 0) {
				link.classList.remove('tab-active');
				link.classList.add('tab-inactive');
				return;
			}
			link.classList.remove('tab-inactive');
			link.classList.add('tab-active');
		});
		Array.prototype.forEach.call(container.getElementsByClassName('tab-content'), function (content, i) {
			if (i > 0) {
				content.classList.remove('tab-active');
				content.classList.add('tab-inactive');
				return;
			}
			content.classList.remove('tab-inactive');
			content.classList.add('tab-active');
		});
	},
	showTab: function (target, event) {
		var tab = document.querySelector(target);
		if (!tab) {
			throw new TypeError("Tab not found");
			return false;
		}
		var container = tab.parentNode;
		if (event) {
			if (event.stopPropagation) event.stopPropagation();
			if (event.preventDefault) event.preventDefault();
		}
		Array.prototype.forEach.call(container.querySelectorAll('.tabs-names>a'), function (link) {
			if (link.getAttribute('href') !== target) {
				link.classList.remove('tab-active');
				link.classList.add('tab-inactive');
				return;
			}
			else {
				link.classList.remove('tab-inactive');
				link.classList.add('tab-active');
			}
		});
		Array.prototype.forEach.call(container.getElementsByClassName('tab-content'), function (content) {
			if (content !== tab) {
				content.classList.remove('tab-active');
				content.classList.add('tab-inactive');
				return;
			}
			else {
				content.classList.remove('tab-inactive');
				content.classList.add('tab-active');
			}
		});
	}
}

Admin2.Tabs.setAllTabs();