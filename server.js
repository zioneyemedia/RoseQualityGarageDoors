var connect  = require('connect'),
    http     = require('http'),
    qs       = require('querystring'),
    port     = process.env.PORT || 8080,
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
              to: 'woodson.dan@gmail.com, srose348@gmail.com, thomas_steger@ymail.com',
              from: 'site@rosequalitygaragedoors.com',
              subject: 'Contact request from website',
              text: 'Contact request\n' +
                    '===============\n' +
                    'Name: ' + (mesgData.name || '(No name given)')  + '\n' +
                    'Email: ' + (mesgData.email || '(No email given)')  + '\n'  +
                    'Phone: ' + (mesgData.phone || '(No phone number given)')  + '\n'  +
                    'Message: ' + (mesgData.message || '(No additional details)')
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
    // Static resources
    .use(connect.static(__dirname))
    .listen(port);

console.log('Listening on port ' + port);
