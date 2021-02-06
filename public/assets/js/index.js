$(document).ready(() => sessionStorage.setItem('edit', false));
const loadImage = new Event('load-image');
const clearCanvas = new Event('clear-canvas');
const saveButton = $('#save-drawing');

// creating and naming new list items.
$('#saveButtonModal').click(() => {
    const title = $('#drawing-title').val().trim();
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
    saveButton.text('Save');
    sessionStorage.setItem('edit', false);
});

//deleting list item
$(document).on('click', '.delete-note', function (event) {
    event.stopPropagation();
    let drawingId = this.parentNode.dataset.id;
    let listEl = $(this.parentNode);
    console.log(listEl);

    // need a delete request
    $.ajax({
        url: '/api/drawings/' + drawingId,
        type: 'DELETE',
    }).then(() => {
        console.log(drawingId + ' deleted');
        listEl.remove();
    });

});

$(document).on('click', '#drawing-list li', function () {
    const id = $(this).attr('data-id');
    saveButton.text('Update');
    sessionStorage.setItem('edit', true);
    sessionStorage.setItem('current-drawing', id);

    $.get(`/api/drawings/${id}`, (data) => {
        window._json = data.body;
        document.dispatchEvent(loadImage);
    });
});
// var dataURL = canvas.toDataURL(); // this code will be used to save canvas as an image (png file)
