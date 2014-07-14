

Admin2.toasts_container = document.createElement('div');
Admin2.toasts_container.id = 'toasts-container';
Admin2.body.appendChild(Admin2.toasts_container);

Admin2.toasts = [];

Admin2.Toast = function(message, duration, options) {
	if (!message) {
		return;
	}

	this.message = message;
	this.duration = duration || Admin2.Toast.DURATION_MEDIUM;

	this._element = document.createElement('div');
	this._element.classList.add('toast');

	this.options = options || {};

	if (this.options.className) {
		this._element.classList.add(options.className);
	}
	if (this.options.style) {
		if (typeof this.options.style === 'string') {
			this._element.style.cssText = this.options.style;
		}
		else {
			for (var prop in this.options.style) {
				this._element.style[prop] = this.options.style[prop];
			}
		}
	}

	this._content_element = document.createElement('p');
	this._content_element.textContent = this.message;

	this._element.appendChild(this._content_element);

	while (Admin2.toasts_container.children.length > Admin2.config.max_toasts_number) {
		Admin2.toasts_container.removeChild(Admin2.toasts_container.firstChild);
	}
	Admin2.toasts_container.appendChild(this._element);

	
	this.dismiss = function() {
		if (this._dismissTimeout) {
			clearTimeout(this._dismissTimeout);
		}
		this._element.classList.add('dismissed');

		setTimeout((function (toast) {
			return function() {
				Admin2.toasts_container.removeChild(toast._element);

				if (toast.options.callback) {
					toast.options.callback();
				}

				var index = Admin2.toasts.indexOf(toast);
				if (index !== -1) {
					Admin2.toasts.splice(index, 1);
				}
			}
		})(this), Admin2.Toast.TRANSITION_TIME);

		return true;
	}
	
	setTimeout((function (toast) {
		return function() {
			toast._element.addEventListener('click', (function (toast) {
				return function() {
					toast.dismiss();
				}
			})(toast), false);

			toast._dismissTimeout = setTimeout((function (toast) {
				return function() {
					toast.dismiss();
				}
			})(toast), toast.duration);
		}
	})(this), Admin2.Toast.TRANSITION_TIME);
	
	Admin2.toasts.push(this);

	return this;
}

/* Config */
Admin2.Toast.TRANSITION_TIME = 200;

Admin2.Toast.DURATION_SHORT = 1000;
Admin2.Toast.DURATION_MEDIUM = 3000;
Admin2.Toast.DURATION_LONG = 5000;

// Basic use:
// new Admin2.Toast("Test");
