var net = require("net");

module.exports = function(func, callback) {
  var server = net.createServer({ allowHalfOpen: true }, function(c) {
    var buf = "";
    c.on("data", function(data) {
      buf += data;
    });
    c.on("end", function() {
      var args = JSON.parse(buf);
      func(args, function(resp) {
        // If there is no return value, set it to something JSON serializable
        if (resp === undefined) {
          resp = null;
        }
        c.end(JSON.stringify(resp));
        server.close();
      });
    });
  });
  server.on("error", function(err) {
    callback(err);
  });
  server.listen(9999, "0.0.0.0", 1, callback);
};
