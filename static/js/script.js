$(document).ready(function() {
	$('.update-form').on('submit', function(e) {
		console.log('submit');
		e.preventDefault();
		var url = $(this).attr('action');
		var newData = $(this).serialize();
		$.ajax({
			method: 'PUT',
			url: url,
			data: newData
		}).done(function(data) {
			window.location = '/articles';
		});
	});


	$('.delete-tag').on('click', function(e) {
		e.preventDefault();
		var url = $(this).attr('href');
		$.ajax({
			method: 'DELETE',
			url: url
		}).done(function(data) {
			window.location = '/articles';
		});
	});
});