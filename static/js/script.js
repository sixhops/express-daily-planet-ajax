$(document).ready(function () {

  // UPDATE on submit function
  $('.edit-form').on('submit', function(e) {
    e.preventDefault();
    console.log("you clicked the button");
    var updatedInfo = $(this).serialize();
    var url = $(this).attr('action');
    console.log(url);
    $.ajax({
      method: 'PUT',
      url: url,
      data: updatedInfo
    }).done(function(data) {
      console.log(data);
      window.location = '/articles';
    });
  });

  // DELETE function
  $('a.delete').on('click', function (e) {
    e.preventDefault();
    var url = $(this).attr('href');
    $.ajax({
      method: 'DELETE',
      url: url
    }).done(function (data) {
      console.log(data);
      window.location = '/articles';
    });
  });

});