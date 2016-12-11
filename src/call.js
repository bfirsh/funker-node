"use strict"

const net = require('net');

let call = (name, args, callback) => {
  var client = net.createConnection({host: name, port: process.env.funker_port || 9999}, () => {
    let stringified = JSON.stringify(args);
    client.end(stringified);
  });

  var buffer = new Buffer(0);
  client.on('error', (err) => {
    callback(err);
  });

  client.on('data', (data) => {
    var tempBuffer = new Buffer(data.length);
    tempBuffer.write(data.toString(), "utf8");
    buffer = Buffer.concat([buffer, tempBuffer]);
  });

  client.on('end', () => {
    let buf = buffer.toString("utf8");
    var returnValue;
    var err;

    try {
      returnValue = JSON.parse(buf);
    } catch(e) {
      let thrown = e;
      console.error(thrown);
      // Silly hack to get an error to serialize.
      err = {"error": JSON.parse(JSON.stringify(thrown, ["message", "arguments", "type", "name"])), "type": "error", "position": "client.end"};
    }

    callback(err, returnValue);
  });
};

module.exports = call; 
