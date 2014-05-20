var connect  = require('connect'),
    fs       = require('fs'),
    http     = require('http'),
    qs       = require('querystring'),
    port     = process.env.PORT || 8080,
    sendgrid = require('sendgrid')(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);

// Build pages
var index_html = fs.readFileSync('html/index.html', {encoding: 'utf-8'}),
    home_html = fs.readFileSync('html/home.html', {encoding: 'utf8'}),
    services_html = fs.readFileSync('html/services.html', {encoding: 'utf8'}),
    products_html = fs.readFileSync('html/products.html', {encoding: 'utf8'}),
    contact_html = fs.readFileSync('html/contact.html', {encoding: 'utf8'}),
    split_phrase = '<div class="main wrapper clearfix">',
    split_idx = index_html.indexOf(split_phrase) + split_phrase.length,
    index_top = index_html.substring(0, split_idx),
    index_bottom = index_html.substring(split_idx);
fs.writeFileSync('index.html', index_top + home_html + index_bottom);
fs.writeFileSync('services.html', index_top + services_html + index_bottom);
fs.writeFileSync('products.html', index_top + products_html + index_bottom);
fs.writeFileSync('contact.html', index_top + contact_html + index_bottom);

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
              to: ['info@zioneyemedia.com', 'srose348@gmail.com', 'thomas_steger@ymail.com'],
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
		else{(req.url === '/murfreesboro-garage-door-installation'){
          console.log('Contact Request');
          req.on('data', function(chunk) {
            var mesgData = qs.parse(chunk.toString());
            console.log("Received body data:");
            console.log(qs.parse(chunk.toString()));
            sendgrid.send({
              to: ['info@zioneyemedia.com'],
              from: 'site@rosequalitygaragedoors.com',
              subject: 'Contact Request for 30% Off Promotion',
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
