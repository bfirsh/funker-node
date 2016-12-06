"use strict"

const funker = require('../src');
const expect = require('chai').expect;

describe('funker', () => {
  describe('#handle()', () => {
    it('should return the result of a basic function', (done) => {
      let f = function(args, callback) {
        callback(args.x + args.y);
      };

      funker.handle(f, () => {
        funker.call("localhost", {x: 1, y: 2}, (err, result) => {
          if (err) {
            done(err);
          }

          expect(result).to.eq(3)
          
          done();
        });
      });
    });
    it('should work when there is no return value', (done)  => {
      let f = function(args, callback) {
        callback();
      };

      funker.handle(f, () => {
        funker.call("localhost", {x: 1}, (err, result)  => {
          if (err) {
            done(err);
          }

          expect(result).not.to.exist;
          done();
        });
      });
    });
  });
});
