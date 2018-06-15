$(document).ready(function() {
    $('.update').on('submit', function(event) {
        event.preventDefault();
        console.log('form submitted');
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

   $('.delete').on('click', function(event) {
      event.preventDefault();
      console.log('delete clicked');
      var url = $(this).attr('href');
      console.log(url);
      $.ajax({
        method: 'DELETE',
        url: url
      }).done(function(data) {
        console.log('deleted');
        window.location = '/articles';
      });
    });
});
