Admin2.TableSelector = function (table, onSelectionChange) {
	this.table = table;
	this.onSelectionChange = onSelectionChange;
	
	if (!this.table.classList.contains('has-selector')) {
		this.table.classList.add('has-selector');
	}

	this.header = this.table.querySelector('thead>tr');

	var lines = this.table.querySelectorAll('tbody>tr');
	this.lines = new Array(lines.length);

	this.checked_lines = 0;

	this.checkbox_all = this.header.querySelector('.table-selection-col input[type=checkbox]');

	if (!this.checkbox_all) {
		this.checkbox_all = document.createElement('input');
		this.checkbox_all.type = 'checkbox';
		this.checkbox_all.checked = false;

		var checkbox_all_th = document.createElement('th');
		checkbox_all_th.className = 'table-selection-col';
		checkbox_all_th.appendChild(this.checkbox_all);

		this.header.insertBefore(checkbox_all_th, this.header.firstChild);

		this.check_all = false;
	}
	else {
		this.check_all = this.checkbox_all.checked;
	}

	this.options_all = this.header.querySelector('.table-options-col');

	if (!this.options_all) {
		this.options_all = document.createElement('th');
		this.options_all.className = 'table-options-col';
		this.options_all.appendChild(this.options_all);

		this.header.appendChild(this.options_all);
	}

	this.onLineCheckChange = function (line) {
		line.checked = line.checkbox.checked;

		if (line.checked) {
			this.checked_lines++;
		}
		else {
			this.checked_lines--;
		}

		if (this.checked_lines === this.lines.length) {
			this.check_all = true;
			this.checkbox_all.checked = true;
		}
		else {
			this.check_all = false;
			this.checkbox_all.checked = false;
		}

		if (this.onSelectionChange) {
			this.onSelectionChange();
		}
	}

	this.onCheckAll = function () {
		this.check_all = this.checkbox_all.checked;

		Array.prototype.forEach.call(this.lines, function (line) {
			line.checkbox.checked = line.checked = this.check_all;
		}, this);

		this.checked_lines = this.check_all ? this.lines.length : 0;

		if (this.onSelectionChange) {
			this.onSelectionChange();
		}
	}

	Array.prototype.forEach.call(lines, function (tr, index) {
		var line = {
			elem: tr,
			checkbox: tr.querySelector('.table-selection-col input[type=checkbox]'),
			options_col: tr.querySelector('.table-options-col')
		};

		if (!line.checkbox) {
			line.checkbox = document.createElement('input');
			line.checkbox.type = 'checkbox';
			line.checkbox.checked = line.checked = this.check_all.checked;

			var checkbox_th = document.createElement('td');
			checkbox_th.className = 'table-selection-col';
			checkbox_th.appendChild(line.checkbox);

			line.elem.insertBefore(checkbox_th, line.elem.firstChild);
		}
		else {
			line.checked = line.checkbox.checked;
		}

		if (!line.options_col) {
			this.options_col = document.createElement('td');
			this.options_col.className = 'table-options-col';
			this.options_col.appendChild(this.options_col);

			this.elem.appendChild(this.options_col);
		}

		if (line.checked) {
			this.checked_lines++;
		}

		line.checkbox.addEventListener('change', this.onLineCheckChange.bind(this, line), false);

		this.lines[index] = line;
	}, this);

	if (this.checked_lines === this.lines.length) {
		this.check_all = true;
		this.onCheckAll.checked = true;
	}

	this.checkbox_all.addEventListener('click', this.onCheckAll.bind(this), false);

	return this;
}

Array.prototype.forEach.call(document.querySelectorAll('table.has-selector'), function (table) {
	var selector = new Admin2.TableSelector(table, function () {
		if (selector.checked_lines) {
			selector.options_all.innerText = selector.checked_lines + '/' + selector.lines.length;
		}
		else {
			selector.options_all.innerText = '';
		}
	});
});