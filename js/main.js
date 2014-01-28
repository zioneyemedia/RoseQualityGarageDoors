(function($){
  var intrSlider;
  var showHome = function () {
        $.get('home.html', function(data){
          $('.wrapper.main').html(data);

          // Setup Slider
          function sliderStart(){
            if(typeof interSlider !== "undefined"){
              window.clearInterval(interSlider);
            }
            intrSlider = window.setInterval(function(){
              var curSlideNum = Number($('.slider input:checked').attr('id').replace('slide', '')),
                  nextSlideId = 'slide' + (curSlideNum+1 > 4 ? 1 : curSlideNum+1),
                  nextSlide = $('#'+nextSlideId);
              $('.slider input').prop('checked', false);
              nextSlide.prop('checked', true);
            }, 2500);
          }
          $('.wrapper.main').on('mouseenter', '.slider', function(){
            window.clearInterval(intrSlider);
          });
          $('.wrapper.main').on('mouseleave', '.slider', function(){
            sliderStart();
          });
          sliderStart();

        });
      },
      showServices = function () {
        $.get('services.html', function(data){
          $('.wrapper.main').html(data);
        });
      },
      showProducts = function () {
        $.get('products.html', function(data){
          $('.wrapper.main').html(data);
        });
      },
      showContact = function () {
        $.get('contact.html', function(data){
          $('.wrapper.main').html(data);
        });
      },
      routes = {
        '/home': showHome,
        '/services': showServices,
        '/products': showProducts,
        '/contact': showContact
      },
      router = Router(routes);
      router.configure({
        on:function(){
          try{
            window.clearInterval(intrSlider);
          }
          catch(err){}
        }
      });

  router.init();

  // Default to home
  if(window.location.hash.slice(2).length === 0){
    showHome();
  }

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
  });

}(jQuery));
