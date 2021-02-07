$(document).ready(() => sessionStorage.setItem('edit', false));
const loadImage = new Event('load-image');
const clearCanvas = new Event('clear-canvas');
const saveButton = $('#save-drawing');
const titleEl = $('#drawing-title');

// creating and naming new list items.
$('#saveButtonModal').on('click' , () => {
    const title = titleEl.val().trim();
    const body = window._json;
    const editMode = sessionStorage.getItem('edit');

    if (editMode !== 'true') {
        $.post('/api/drawings', { title, body }).then(data => {
            createElement(data.title, data.id);
            document.dispatchEvent(clearCanvas);
        });
    } else if (editMode) {
        const id = sessionStorage.getItem('current-drawing');

        $.ajax({
            url: `/api/drawings/${id}`,
            data: { title, body },
            type: 'PUT',
        }).then(() => {
            $(`[data-id=${id}]`).children('a.alert-link').text(title);
            setEdit(false);
            document.dispatchEvent(clearCanvas);
        });
    }
    titleEl.val('');
});

$('#clearButton').on('click', () => {
    const clearCanvas = new Event('clear-canvas');
    setEdit(false);
    document.dispatchEvent(clearCanvas);
});

//deleting list item
$(document).on('click', '.delete-note', function (event) {
    event.stopPropagation();

    let drawingId = this.dataset.id;
    let listEl = this.parentElement.parentElement;

    //delete request
    $.ajax({
        url: '/api/drawings/' + drawingId,
        type: 'DELETE',
    }).then(() => {
        listEl.remove();
    });

});

$(document).on('click', '#drawing-list li', function () {
    const id = $(this).attr('data-id');
    const title = $(this).attr('data-title');

    setEdit(true, title, id);

    $.get(`/api/drawings/${id}`, (data) => {
        window._json = data.body;
        document.dispatchEvent(loadImage);
    });
});

const createElement = function(title, id){
    const $li = $('<li>')
        .addClass('list-group-item')
        .attr('data-id', id);
    const $a = $('<a>')
        .text(title)
        .attr('href', '#')
        .attr('class', 'alert-link');
    const $a2 = $('<a>')
        .attr('href', '#');
    const $i = $('<i>')
        .addClass('fas fa-trash-alt float-right text-secondary delete-note')
        .attr('data-id', id);

    $a2.append($i);
    $li.append($a).append($a2);
    $('#drawing-list').append($li);
};

const setEdit = (edit, title, id) => {
    sessionStorage.setItem('edit', edit);

    if(edit){
        sessionStorage.setItem('current-title', title);
        sessionStorage.setItem('current-drawing', id);
        saveButton.text('Update');
    } else{
        sessionStorage.setItem('current-title', null);
        sessionStorage.setItem('current-drawing', null);
        saveButton.text('Save');
    }
};