"use strict"

const net = require('net');

let handler = (func, callback) => {
  let server = net.createServer({allowHalfOpen: true}, (connection) => {
    let buf = '';

    connection.on('data', (data) => {
      buf += data;
    });

    connection.on('end', () => {
      let args = JSON.parse(buf);
      func(args, (resp) => {
        // If there is no return value, set it to something JSON serializable
        if (resp === undefined) {
          resp = null;
        }

        connection.end(JSON.stringify(resp));
        server.close();
      });
    });
  });

  server.on('error', (err) => {
    callback(err);
  });
  
  server.listen(process.env.funker_port || 9999, '0.0.0.0', 1, callback);
};

module.exports = handler;
