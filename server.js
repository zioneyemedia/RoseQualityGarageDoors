var connect = require('connect'),
    http = require('http'),
    qs = require('querystring'),
    port = process.env.PORT || 8080,
    sendgrid = require('sendgrid')(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);

connect()
    .use(connect.logger())
    // Contact form
    .use(function (req, res, next) {
      if(req.method === 'POST') {
        if(req.url === '/contact'){
          console.log('Contact Request');
          req.on('data', function(chunk) {
            var mesgData = qs.parse(chunk.toString());
            console.log("Received body data:");
            console.log(qs.parse(chunk.toString()));
            sendgrid.send({
              to: 'woodson.dan@gmail.com',
              from: 'site@rosequalitygaragedoors.com',
              subject: 'Contact request from website',
              text: 'Contact request:\n' + JSON.stringify(mesgData)
              },
              function(err, json) {
                if (err) { return console.error(err); }
                  console.log(json);
              });
          });
          res.writeHead(200, "OK", {'Content-Type': 'text/html'});
          res.end();
        }
        else{
          next();
        }
      }
      else {
        next();
      }
    })
    .use(connect.static(__dirname))
    .listen(port);

console.log('Listening on port ' + port);

function sendEmail(name, email, phone, mesg){
  
}
