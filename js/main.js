(function($){

  $(document).ready(function(){
    $('body').on('submit', '.contact + aside form', function(e){
      e.preventDefault();
      var $form = $('.contact + aside form');
      $.ajax({
        type: "POST",
        url: "/contact",
        data: {
          "name": $form.find('[name="name"]').val(),
          "email": $form.find('[name="email"]').val(),
          "phone": $form.find('[name="phone"]').val(),
          "message": $form.find('[name="message"]').val(),
        },
        success: function(){
          $('.contact + aside').html('<h3>Thank you, message sent</h3>');
        }
      });
    });
/*
    // Anchor bottom
    $('window').load(function(){
      $(function(){
        var contentHeight = $('.main-container').height();
        var overflowHeight = $('.main-container .wrapper').height();
        console.log('cnt height: ' + contentHeight);
        console.log('ovrflow height: ' + overflowHeight);
        if (overflowHeight > contentHeight) {
          $('.footer-container').css({
            'position': 'relative',                                                                                          
            'bottom': 0                                                                                                      
          });
        }
        else {
          $('.footer-container').css({
            'position': 'absolute',
            'bottom': '10px'                                                                                                 
          });
        }
      });
    });
*/
  });

}(jQuery));
