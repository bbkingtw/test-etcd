const http = require('http')  
const Etcd = require('node-etcd')  
//..const etcd = new Etcd('localhost', '4001')

var path=require('path');
var argv=require('optimist').argv

const hostname = '127.0.0.1' 
var listen_port = 3000

var port=argv.port||4001

etcd = new Etcd("127.0.0.1:"+port);
etcd.set("/f14/log", "http://f14acim/log");

var express=require('express')
var app=express()

app.get('/service/:fab/:key*', function(req,res){
	if (req.query.debug) return res.send(req.params);
	var fab=req.params.fab;
	var key=path.join(req.params.fab, req.params.key, req.params[0]);
	console.log('key',key);
	etcd.get(key, function (err, val) {
		console.log('err',err);
		console.log('val',val);
		if(err) {
			return res.send('nothing found for '+key)
		}
		else {
			console.log('node',val.node);
			if (req.query.verbose)
				res.send({fab:fab, key:key, val:val, result:val.value});
			else
				res.send(val.node.value);
		}
	});
});

//http.createServer(function(req, res)  {  
//  etcd.get(req.url.slice(1), function (err, result) {
//    res.writeHead(200, { 'Content-Type': 'text/plain' })
//    if (err) {
//        console.log(err)
//        res.end('No value for key "' + req.url.slice(1) + '" available in etcd')
//    } else {
//        res.end('Got value for key "' + req.url.slice(1) + '" from etcd: ' + result.node.value)
//    }
//  })
//}).listen(listen_port, hostname, function() {
//  console.log('Server running at http://'+hostname+':'+listen_port+'/')
//})

console.log('listen at',listen_port);
app.listen(listen_port);
