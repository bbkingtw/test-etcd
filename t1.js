var etcd = require('etcd');
var argv=require('optimist').argv
var port=argv.port||4101;

console.log('port=>',port);
 
etcd.configure({
  host: '127.0.0.1',
  port: port
});

etcd.set('hello', 'world', function (err) {
  if (err) throw err;
});

return
etcd.get('hello', function (err, result) {
  if (err) throw err;
  assert(result.value);
});
