var app = module.exports = require('koa')();

var routes = require('koa-route');
var parse = require('co-body');
var monk = require('monk');
var wrap = require('co-monk');
var db = monk('localhost/apiUsers');
var users = wrap(db.get("users"));

// for tests
//TODO rename to dbUsers
module.exports.users = users;

app.use(routes.post("/user", addUser));
app.use(routes.get("/user/:id",getUser));

app.listen(3000);
console.log('The app is listening, Port: 3000');

function *addUser() {
  var userFromRequest = yield parse(this);

  // TODO add simple schema
  if(!userFromRequest.name) {
    this.throw(400, "name required");
  }

  var insertedUser = yield users.insert(userFromRequest);

  this.set("location", "/user/" + insertedUser._id);
  this.status = 200;
}

function *getUser(id) {
  var user = yield users.findById(id);

  this.body = user;
  this.status = 200;
}

