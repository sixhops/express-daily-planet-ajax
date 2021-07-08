$(document).ready( function() {
    console.log('working');
    // PUT
    $('#edit').on('submit', function(e) {
        e.preventDefault();
        var updatedInfo = $(this).serialize();
        var url = $(this).attr('action');
        $.ajax({
            method: 'PUT',
            url: url,
            data: updatedInfo
        }).done( function(data) {
            console.log(data);
            window.location = url;
        })
    })

    $('.destroy').on('click', function(e) {
        e.preventDefault();
        var url = $(this).attr('href');
        $.ajax({
            method: 'DELETE',
            url: url
        }).done( function(data) {
            console.log(data);
            window.location = '/articles';
        })
    })
})