$( window ).on( "load", function() {
  console.log( "window loaded" );
});

// creating and naming new list items. 
$("#saveButton").click( () => {
  let name = prompt("What is the file's name?")

  if (name != null) {
      $("#imageDirectoryList").append(`
      <li> ${name} <i class="fas fa-trash-alt float-end text-danger"></i> </li>`)
  }
})

//deleting list item
$("#clearButton").click( () => {
  $('li').last().remove();
});

var dataURL = canvas.toDataURL(); // this code will be used to save canvas as an image (png file).