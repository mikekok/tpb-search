var assert = require('chai').assert;
var tpb = require('./index.js');

describe('Find Torrents', function () {
    it('Should return a few torrents', function (done) {
		tpb.search('Ghost in the Shell', function(err, results) {
			if(err) {
				return done(new Error(err));
			}

			assert.notEqual(results.length, 0, 'A few torrents were found!');
			done();
		});
    });
});