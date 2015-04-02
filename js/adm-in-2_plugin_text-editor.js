Admin2.TextEditor = function (textarea, options) {
	if (typeof options === 'undefined') {
		options = {};
	}
	if (typeof options.buttons === 'array') {
		this.buttons = options.buttons;
	}
	if (typeof options.baseURL === 'string') {
		this.baseURL = options.baseURL;
	}
	if (typeof options.buttonsClassName === 'string') {
		this.buttonsClassName = options.buttonsClassName;
	}
	else if (typeof options.buttonsClassName === 'array') {
		this.buttonsClassName = options.buttonsClassName.join(' ');
	}

	this.textarea = textarea;

	if (this.buttons) {
		this.buttonsArea = document.createElement('div');
		this.buttonsArea.className = 'editor-options';
		this.textarea.parentNode.insertBefore(this.buttonsArea, this.textarea);

		this.buttons.forEach(function (button) {
			var btn = document.createElement('button');

			if (this.buttonsClassName) {
				btn.classList.add(this.buttonsClassName);
			}

			if (button.className) {
				btn.classList.add(button.className);
			}
			if (button.title) {
				btn.title = button.title;
			}
			btn.innerHTML = button.content;

			btn.addEventListener('click', (function (btn, button, e) {
				e.preventDefault();

				if (button.command) {
					document.execCommand(button.command, false, null);
				}
				if (button.customCommand) {
					button.customCommand.call(this, button);
				}

				if (this.baseURL) {
					this.editorArea.innerHTML = this.setURLs();
					this.textarea.value = this.reverseURLs();
				}
				else {
					this.textarea.value = this.editorArea.innerHTML;
				}
			}).bind(this, btn, button), false);

			this.buttonsArea.appendChild(btn);
			this.buttonsArea.appendChild(document.createTextNode(' '));
		}, this);
	}

	this.editorArea = document.createElement('pre');
	this.editorArea.className = this.textarea.className;
	this.editorArea.contentEditable = true;
	this.editorArea.style.minHeight = this.textarea.offsetHeight + 'px';
	this.editorArea.innerHTML = this.textarea.value;
	this.textarea.parentNode.insertBefore(this.editorArea, this.textarea);

	try {
		document.execCommand('styleWithCSS', false, false);
	}
	catch(e) {
		
	}


	if (this.baseURL) {
		this.setURLs = function () {
			return this.editorArea.innerHTML.replace(new RegExp('(src|href)="([^http|https|ftp|\/\/][^"]+)"', 'gi'), '$1="' + this.baseURL + '$2"');
		}
		this.reverseURLs = function () {
			return this.editorArea.innerHTML.replace(new RegExp('(src|href)="' + this.baseURL + '([^"]+)"', 'gi'), '$1="$2"');
		}

		this.editorArea.addEventListener('input', (function (e) {
			this.textarea.value = this.reverseURLs();
		}).bind(this), false);

		this.editorArea.innerHTML = this.setURLs();
	}

	this.textarea.classList.add('hidden');

	return this;
}

Admin2.TextEditor.prototype.buttons = [
	{
		content: 'B',
		className: 'bold',
		title: 'Toggle bold',
		command: 'bold'
	},
	{
		content: 'I',
		className: 'italic',
		title: 'Toggle italic',
		command: 'italic'
	},
	{
		content: '²',
		className: 'superscript',
		title: 'Toggle superscript',
		command: 'superscript'
	},
	{
		content: '₂',
		className: 'subscript',
		title: 'Toggle subscript',
		command: 'subscript'
	},
	{
		content: 'img',
		className: 'img',
		title: 'Insert an image',
		customCommand: function (btn) {
			var imageSrc;

			do {
				imageSrc = prompt('Image URL', 'http://');
			} while(imageSrc === '')

			if (typeof imageSrc !== 'string') {
				return;
			}

			document.execCommand('insertImage', false, imageSrc);
		}
	},
	{
		content: '×',
		className: 'removeFormat',
		title: 'Remove all formatting',
		command: 'removeFormat'
	}
];

if (Admin2.TextEditorReplacementURL) {
	Admin2.TextEditor.prototype.baseURL = Admin2.TextEditorReplacementURL + '/';
}

Array.prototype.forEach.call(document.querySelectorAll('textarea.text-editor'), function (area) {
	var editor = new Admin2.TextEditor(area, { buttonsClassName: 'button-xs' });
});