$(document).ready(() => sessionStorage.setItem('edit', false));
// creating and naming new list items.
$('#saveButton').click(() => {
    const clearCanvas = new Event('clear-canvas');
    const title = prompt('What is the file\'s title?').trim();
    const body = window._json;

    const editMode = sessionStorage.getItem('edit');

    if (editMode !== 'true') {
        $.post('/api/drawings', { title, body }).then(data => {
            const $li = $('<li>')
                .addClass('list-group-item')
                .attr('data-id', data.id);
            const $span = $('<span>').text(title);
            const $i = $('<i>')
                .addClass('fas fa-trash-alt float-right text-danger delete-note')
                .attr('data-id', data.id);

            $li.append($span).append($i);
            $('#drawing-list').append($li);

            document.dispatchEvent(clearCanvas);
        });
    } else if (editMode) {
        const id = sessionStorage.getItem('current-drawing');

        $.ajax({
            url: `/api/drawings/${id}`,
            data: { title, body },
            type: 'PUT',
        }).then(() => {
            $(`[data-id=${id}]`).children('span').text(title);
            sessionStorage.setItem('edit', false);
            document.dispatchEvent(clearCanvas);
        });
    }
});

$('#clearButton').click(() => {
    const clearCanvas = new Event('clear-canvas');
    document.dispatchEvent(clearCanvas);
    sessionStorage.setItem('edit', false);
});

//deleting list item
$(document).on('click', '.delete-note', function () {
    let drawing = this.parentNode.dataset.id;
    console.log(drawing);

    // need a delete request
    $.ajax({
        url: '/api/drawings/' + drawing,
        type: 'DELETE',
    }).then(console.log(drawing + ' deleted'));
});
// var dataURL = canvas.toDataURL(); // this code will be used to save canvas as an image (png file)
