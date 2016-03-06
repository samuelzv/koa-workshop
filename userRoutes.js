var parse = require('co-body');
var monk = require('monk');
var wrap = require('co-monk');
var db = monk('localhost/apiUsers');
var users = wrap(db.get("users"));

// for tests
//TODO rename to dbUsers
module.exports.users = users;


module.exports.addUser = function *addUser() {
  var userFromRequest = yield parse(this);

  // TODO add simple schema
  if(!userFromRequest.name) {
    this.throw(400, "name required");
  }

  var insertedUser = yield users.insert(userFromRequest);

  this.set("location", "/user/" + insertedUser._id);
  this.status = 200;
};

module.exports.getUser = function *getUser(id) {
  var user = yield users.findById(id);

  this.body = user;
  this.status = 200;
};

module.exports.updateUser = function *updateUser(id) {
  var userFromRequest = yield parse(this);

  yield users.updateById(id, userFromRequest);

  this.set("location", "/user/" + id);
  this.status = 204;
};

module.exports.deleteUser = function *deleteUser(id) {
  yield users.remove({id:id});
  this.status = 200;
};

