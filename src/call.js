"use strict"

const net = require('net');

module.exports = (name, args, callback) => {
  var client = net.createConnection({host: name, port: process.env.funker_port || 9999}, () => {
    client.end(JSON.stringify(args));
  });

  var buf = '';
  client.on('error', (err) => {
    callback(err);
  });

  client.on('data', (data) => {
    buf += data;
  });

  client.on('end', () => {
    var returnValue = JSON.parse(buf);
    callback(null, returnValue);
  });
};
