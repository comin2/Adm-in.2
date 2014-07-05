Admin2.Draggables = {
	handleDragStart: function (event) {
		if(!event.target.draggable) {
			return false;
		}
		event.target.classList.add('dragged');
	},
	handleDragEnd: function (event) {
		if(!event.target.draggable) {
			return false;
		}
		event.target.classList.remove('dragged');
	}
}

document.addEventListener('dragstart', Admin2.Draggables.handleDragStart, false);
document.addEventListener('dragend', Admin2.Draggables.handleDragEnd, false);