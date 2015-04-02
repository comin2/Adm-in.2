Admin2.Sortable = function (elemParent, selectorChildren, onOrderChange, onSetupCallback) {
	this.elemParent = elemParent.constructor.name === 'String' ? document.querySelector(elemParent) : elemParent;

	if (!this.elemParent) {
		throw 'Invalid parent element';
		return;
	}

	this.selectorChildren = selectorChildren;

	this.elemsChildren = selectorChildren.constructor.name === 'String' ? this.elemParent.querySelectorAll(selectorChildren) : selectorChildren;

	if (!this.elemsChildren || !this.elemsChildren.length) {
		throw 'No children found';
		return;
	}

	this.onOrderChange = onOrderChange;

	this.currentDraggedElement = null;

	Array.prototype.forEach.call(this.elemsChildren, function (child) {
		child.setAttribute('draggable', true);
		child.addEventListener('dragstart', this.onChildDragStart.bind(this, child), false);
		child.addEventListener('drag', this.onChildDrag.bind(this, child), false);
		child.addEventListener('dragend', this.onChildDragEnd.bind(this, child), false);

		child.addEventListener('dragenter', this.onChildDragEnter.bind(this, child), false);
		child.addEventListener('dragleave', this.onChildDragLeave.bind(this, child), false);
	}, this);

	if (onSetupCallback) {
		onSetupCallback.call(this, this.elemsChildren);
	}
}
Admin2.Sortable.prototype.onChildDragStart = function (child, event) {
	this.currentDraggedElement = child;
	child.classList.add('dragged');
}
Admin2.Sortable.prototype.onChildDrag = function (child, event) {
	
}
Admin2.Sortable.prototype.onChildDragEnd = function (child, event) {
	this.currentDraggedElement = null;
	child.classList.remove('dragged');
}
Admin2.Sortable.prototype.onChildDragEnter = function (child, event) {
	if (!this.currentDraggedElement) {
		return;
	}
	var child_index = Array.prototype.indexOf.call(child.parentNode.childNodes, child);
	var dragged_item_index = Array.prototype.indexOf.call(this.currentDraggedElement.parentNode.childNodes, this.currentDraggedElement);

	if (dragged_item_index > child_index) {
		child.parentNode.insertBefore(this.currentDraggedElement, child);
	}
	else {
		child.parentNode.insertBefore(this.currentDraggedElement, child.nextElementSibling);
	}

	this.elemsChildren = this.selectorChildren.constructor.name === 'String' ? this.elemParent.querySelectorAll(this.selectorChildren) : this.selectorChildren;

	if (this.onOrderChange) {
		this.onOrderChange(this.elemsChildren);
	}
}
Admin2.Sortable.prototype.onChildDragLeave = function (child, event) {
	
}



Array.prototype.forEach.call(document.querySelectorAll('ul.sortable'), function (list) {
	new Admin2.Sortable(list, 'li', function (children) {
		Array.prototype.forEach.call(children, function (item, index) {
			item.dataset.order = index;
		});
	});
});