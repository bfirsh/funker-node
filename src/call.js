var net = require('net');

module.exports = function(name, args, callback) {
  var client = net.createConnection({host: name, port: 9999}, function() {
    client.end(JSON.stringify(args));
  });
  var buf = '';
  client.on('error', function(err) {
    callback(err);
  });
  client.on('data', function(data) {
    buf += data;
  });
  client.on('end', function() {
    var returnValue = JSON.parse(buf)
    callback(null, returnValue);
  });
};
