var app = require('./app.js');

var request = require('supertest').agent(app.listen());

describe("Simple User Http CRUD Api", function() {
  var user = {name: 'Samuel', age: 42, height:1.70};

  it("add new users", function (done) {
    request
      .post("/user")
      .send(user)
      .expect("location", /^\/user\/[0-9a-fA-F]{24}$/)
      .expect(200, done)
  });

});





