var connect = require('connect'),
    http = require('http'),
    directory = __dirname,
    port = process.env.PORT || 8080;

connect()
    .use(connect.static(directory))
    .listen(port);

console.log('Listening on port ' + port);
