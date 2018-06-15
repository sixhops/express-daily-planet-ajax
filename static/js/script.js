$(document).ready(function () {

  console.log('jquery working');

  // PUT - revise a specific article in the database
	$('.edit-form').on('submit', function(e) {
    console.log('edit article clicked!');
		e.preventDefault();
		var newData = $(this).serialize();
  	var url = $(this).attr('action');
  	$.ajax({
  		method: 'PUT',
  		url: url,
  		data: newData
  	}).done(function(data) {
  		window.location = '/articles';
  	});
	});

  // DELETE a specific article from the database
	$(".delete").on('click', function(e) {
		e.preventDefault();
    var url = $(this).attr('href');
    $.ajax({
    	method: 'DELETE',
    	url: url
    }).done(function(data) {
    	window.location = '/articles';
    })
	});
})