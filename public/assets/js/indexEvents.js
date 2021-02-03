// bring things in if they need to be brought in

// create variables to hold html elements

// create funcitons to handle the saving of drawings

// craete funcitons to create list items for each drawing that a user has

// create functions to handle the deletion of a drawing
$(".fa-trash-alt").on("click", function(event) {
    event.preventDefault();

    const drawingID = this.attr("data-id");
    // use api route to delete drawing with an ajax call
    $.ajax().then();

    // after deleting drawing update the list
});