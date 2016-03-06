var koa = require('koa');
var app = koa();


var addNameHeader = function *(next) {
  this.set('X-UserName', 'samuelzv-' + Date.now());

  yield function(next) {
    setTimeout(next, 1000);
  }

};

const addCityHeader = function *(next) {
  this.set('X-City', 'Mexico-' + Date.now());
  yield next;
};

app.use(addNameHeader);
app.use(addCityHeader);

app.use(function *() {
  this.body = 'Hello world';
});


app.listen(3000);
console.log('Listening on port %d', 3000);
