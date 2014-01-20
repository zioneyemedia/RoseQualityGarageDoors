var connect = require('connect'),
    http = require('http'),
    directory = __dirname,
    port = process.env.PORT || 8080;

connect()
    .use(connect.logger())
    // Contact form
    .use(function (req, res, next) {
      if(req.method === 'POST') {
        console.log("This is a POST request");
        next();
      }
      else {
        next();
      }
    })
    .use(connect.static(directory))
    .use(function(req, res){
      console.log(req.url);
    })
    .listen(port);

console.log('Listening on port ' + port);
