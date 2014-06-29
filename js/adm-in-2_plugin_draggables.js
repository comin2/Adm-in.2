Admin2.Draggables = {
	handleDragStart: function (e) {
		this.classList.add('dragged');
	},
	handleDragEnd: function (e) {
		this.classList.remove('dragged');
	}
}

Admin2.draggable_elements = document.querySelectorAll('[draggable="true"]');
console.dir(Admin2.draggable_elements);

[].forEach.call(Admin2.draggable_elements, function(draggable_elem) {
	draggable_elem.addEventListener('dragstart', Admin2.Draggables.handleDragStart, false);
	draggable_elem.addEventListener('dragend', Admin2.Draggables.handleDragEnd, false);
});