"use strict"

const net = require('net');

let handler = (func, callback) => {
  let server = net.createServer({allowHalfOpen: true}, (connection) => {
    var buffer = new Buffer(0);

    connection.on('data', (data) => {
      var tempBuffer = new Buffer(data.length);
      tempBuffer.write(data.toString(), "utf8");
      buffer = Buffer.concat([buffer, tempBuffer]);
    });

    connection.on('end', () => {
      let buf = buffer.toString("utf8");
      let args = JSON.parse(buf);

      func(args, (resp) => {
        // If there is no return value, set it to something JSON serializable
        if (resp === undefined) {
          resp = null;
        }

        connection.end(JSON.stringify(resp));
        server.close();
        buffer = new Buffer(0);
      });
    });
  });

  server.on('error', (err) => {
    callback(err);
    buffer = new Buffer(0);
  });
  
  server.listen(process.env.funker_port || 9999, '0.0.0.0', 1, callback);
};

module.exports = handler;
