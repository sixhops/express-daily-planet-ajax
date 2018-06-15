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
        }).done( function(article) {
            console.log(article);
            window.location = url;
        })
    })

    $('.destroy').on('click', function(e) {
        e.preventDefault();
        var url = $(this).attr('href');
        $.ajax({
            method: 'DELETE',
            url: url
        }).done( function(article) {
            console.log(article);
            window.location = '/articles';
        })
    })
})