(function($){
  var showHome = function () {
        $.get('home.html', function(data){
          $('.wrapper.main').html(data);
        })
      }, 
      showServices = function () {
        $.get('services.html', function(data){
          $('.wrapper.main').html(data);
        })
      },
      showContact = function () {
        $.get('contact.html', function(data){
          $('.wrapper.main').html(data);
        })
      }, 
      routes = {
        '/home': showHome,
        '/services': showServices,
        '/contact': showContact
      },
      router = Router(routes);

  router.init();
}(jQuery))
