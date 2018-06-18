// $(document).ready(function(){
//   $('.edit-form').on('submit', function(e){
//     e.preventDefault();
//     console.log('clicked!')
//     var updatedInfo =$(this).serialize();
//     var url= $(this).attr('action');
//
//
//     $.ajax({
//       method: 'PUT',
//       url: url,
//       data: updatedInfo
//     }).done(function(data){
//       console.log(data);
//       window.location ='/articles'
//     })
//
//
//   })
//   $('a.delete').click(function(e){
//     e.preventDefault();
//     var url = $(this).attr('href');
//     $.ajax({
//       method: 'DELETE',
//       url: url
//     }).done(function(data){
//       window.location = '/articles';
//     })
//   })
// })
