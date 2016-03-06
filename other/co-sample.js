var co = require('co');
var wait = require('co-wait');

/*
co(function *() {
  console.log('Started');
  console.time('sequence');

  console.log(Date.now());
  yield wait(3000);

  console.log(Date.now());
  console.timeEnd("sequence");
  console.log("completed");

});
*/

co(function *() {

  console.time('parallel');

  var a = wait(1000);
  var b = wait(2000);
  var c = wait(5000);

  yield [a, b, c];

  console.timeEnd('parallel');
});
