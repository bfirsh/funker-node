var assert = require('assert');
var funker = require('../src');
describe('funker', function() {
  describe('#handle()', function() {
    it('should return the result of a basic function', function(done) {
      var f = function(args, callback) {
        callback(args.x + args.y);
      };

      funker.handle(f, function() {
        funker.call("localhost", {x: 1, y: 2}, function(err, result) {
          if (err) done(err);
          assert.equal(result, 3);
          done();
        });
      });
    });
  });
});
