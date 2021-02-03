// creating and naming new list items.
$('#drawing-list').click(() => {
    $('#drawing-list').append('<div>Fire</div>');
});

$('#saveButton').click(() => {
    const title = prompt('What is the file\'s title?').trim();
    const body = window._json;

    if (title) {
        $.post('/api/drawings', { title, body }).then(data => {
            const $li = $('<li>')
                .addClass('list-group-item')
                .attr('data-id', data.id);
            const $span = $('<span>').text(data.title);
            const $i = $('<i>')
                .addClass('fas fa-trash-alt float-right text-danger delete-note')
                .attr('data-id', data.id);

            $li.append($span).append($i);
            $('#drawing-list').append($li);
        });
    }
});

//deleting list item
$('#clearButton').click(() => {
    $('li').last().remove();
});

// var dataURL = canvas.toDataURL(); // this code will be used to save canvas as an image (png file).
