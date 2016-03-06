var app = require('./app.js');
var co = require('co');
var users = require('./userRoutes.js').users;

var request = require('supertest').agent(app.listen());

describe("Simple User Http CRUD Api", function() {
  var user;

  beforeEach(function (done) {
    user = {name: 'Samuel', age: 42, height:1.7};

    done();
  });

  it("add new users", function (done) {
    request
      .post("/user")
      .send(user)
      .expect("location", /^\/user\/[0-9a-fA-F]{24}$/)
      .expect(200, done)
  });

  it("fails with validation error for users without name", function(done) {

    delete user.name;

    request
      .post("/user")
      .send(user)
      .expect("name required")
      .expect(400, done)
  });

  it("get existing user by id", function(done) {

    co(function *() {
        // insert test user in db
        var insertedUser = yield users.insert(user);

        // get url of user
        var url = "/user/" + insertedUser._id;

        // check url
        request
          .get(url)
          .set("Accept", "application/json")
          .expect("Content-type", /json/)
          .expect(/Samuel/)
          .expect(/1.7/)
          .expect(200, done);
    });

  });

  it("updates an existing user", function (done) {

    co(function *() {
      var insertedUser = yield users.insert(user);
      var url = "/user/" + insertedUser._id;

      request
        .put(url)
        .send({name: "Older Marcus", age: 43, height:1.94})
        .expect("location", url)
        .expect(204, done)
    });

  });

  it("deletes an existing user", function (done) {

    co(function *() {
      var insertedUser = yield users.insert(user);
      var url = "/user/" + insertedUser._id;

      request
        .del(url)
        .expect(200, done)

    });

  });

});





