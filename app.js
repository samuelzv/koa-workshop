var app = module.exports = require('koa')();

var routes = require('koa-route');
var parse = require('co-body');
var monk = require('monk');
var wrap = require('co-monk');
var db = monk('localhost/apiUsers');
var users = wrap(db.get("users"));

app.use(routes.post("/user", addUser));

app.listen(3000);
console.log('The app is listening, Port: 3000');

function *addUser() {
  console.log('hello world');
  var userFromRequest = yield parse(this);

  var insertedUser = yield users.insert(userFromRequest);

  this.set("location", "/user/" + insertedUser._id);
  this.status = 200;
}

