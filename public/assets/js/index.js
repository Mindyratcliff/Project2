$(window).on('load', () => {
    console.log('window loaded');

    // creating and naming new list items.
    $('#saveButton').click(() => {
        let name = prompt('What is the file\'s name?');

        if (name !== null) {
            $('#imageDirectoryList').append(`
            <li> ${name} <i class="fas fa-trash-alt float-end text-danger"></i> </li>`);
        }

        $.post('/api/drawings', { data }, (err) => {
            if (err) {
                console.err(err);
            }
        });
    });

    //deleting list item
    $('#clearButton').click(() => {
        $('li').last().remove();
        $.delete('/api/drawings', { data }, (err) => {
            if (err) {
                console.err(err);
            }
        });
    });

    $('<li>').click(() => {
    // code here to show image on the canvas
        $.get('/api/drawings', { data }, (err) => {
            if (err) {
                console.err(err);
            }
        });
        // put to update image in the database
        $.put('/api/drawings', { data }, (err) => {
            if (err) {
                console.err(err);
            }
        });
    });

    var dataURL = canvas.toDataURL(); // this code will be used to save canvas as an image (png file).
});