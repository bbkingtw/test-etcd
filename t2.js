var etcd = require('nodejs-etcd');
 
var e = new etcd({
    url: 'https://localhost:4001'
})

e.write({
    key: 'hello',
    value: 'world',
    }, function (err,resp, body) {
  if (err) throw err;
  console.log(body);
});

console.log(e)
