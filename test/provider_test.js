'use strict';

var test = require('tape');
var mandrillPlugin = require('../lib');

test('GitEvents-Mailer-Provider-Mandril', function (t) {
  t.plan(1);
  t.equal(typeof mandrillPlugin, 'function', 'exports a function');

  /* eslint-disable no-shadow */
  test('initialise it', function (t) {
    t.plan(10);
    t.throws(mandrillPlugin.bind(null), /API KEY is required/i,
             'exported function takes API KEY as first parameter and an optional options object as second one');
    t.throws(mandrillPlugin.bind(null, 10), /API KEY must be a non-empty string/i,
             'exported function API KEY parameters must be a string');
    t.throws(mandrillPlugin.bind(null, ''), /API KEY must be a non-empty string/i,
             'exported function API KEY parameters must be a non-empty string');
    t.doesNotThrow(mandrillPlugin.bind(null, 'APIKEY'),
                   'exported function return the object plugin when only one parameters, API KEY is provided');
    t.doesNotThrow(mandrillPlugin.bind(null, 'APIKEY', {}),
                   'exported function options parameter may have a message and sendOptions to replace defaults');
    t.throws(mandrillPlugin.bind(null, 'APIKEY', {
      message: 'this is wrong type'
    }), /options message must be an object/i,
    'exported function options parameter message must be an object');

    t.throws(mandrillPlugin.bind(null, 'APIKEY', {
      sendOptions: 'this is wrong type'
    }), /options sendOptions must be an object/i,
    'exported function options parameter sendOptions must be an object');

    var mPlugin = mandrillPlugin('APIKEY');
    t.equal(Object.keys(mPlugin).length, 1, 'returns an object which only has one property');
    t.equal(typeof mPlugin.provider, 'object', 'returns an object which must have `provider`');
    t.equal(typeof mPlugin.provider.send, 'function', '`provider` object implements gitevents-mailer provider API');

    test('to use mandrill templates', function (t) {
      t.plan(6);
      t.throws(mandrillPlugin.bind(null, 'APIKEY', { template: {} }), /options template must be a string/i,
               'exported function options parameter template to be an string');
      t.throws(mandrillPlugin.bind(null, 'APIKEY', { template: '' }), /options template must be a non-empty string/i,
               'exported function options parameter template to be a non-empty string');

      var mPlugin = mandrillPlugin('APIKEY', { template: 'name' });
      t.equal(Object.keys(mPlugin).length, 2, 'returns an object which has two properties');
      t.equal(typeof mPlugin.provider, 'object', 'returns an object which must have `provider`');
      t.equal(typeof mPlugin.provider.send, 'function', '`provider` object implements gitevents-mailer provider API');
      t.equal(typeof mPlugin.renderer, 'function', 'returns an object which must have `renderer`');
    });
  });
});
