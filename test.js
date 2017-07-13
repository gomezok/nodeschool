/*
var EventEmitter = require('events').EventEmitter;
var event = new EventEmitter();

event.on('test',function(){
    console.log('This is a test.');
});

setTimeout(function(){
    event.emit('test');
},3000);

var name;

exports.setName = function(sayName){
    name = sayName;
};

exports.sayHello = function(){
    console.log('hello:'+name);
};

process.stdin.resume();

process.stdin.on('data',function(data){
    process.stdout.write('你输入的是：'+data.toString());
});

var util = require('util');
function Base(){
    this.name = 'base';
    this.base = 1991;
    this.sayHello = function(){
        console.log('hello '+this.name);
    };
}

Base.prototype.showName = function(){
    console.log(this.name);
};

function sub(){
    this.name = 'gengmin';
}

util.inherits(sub,Base);

var base = new Base();
base.showName();
base.sayHello();
console.log(base);

var sub = new sub();
sub.showName();
sub.sayHello();
console.log(sub);

var util = require('util');

function Person(){
    this.name = 'gomez';

    this.toString = function(){
        return this.name;
    };
}

// var obj = new Person();
var obj = new Date();
console.log(util.isDate(obj));

var events = require('events');

var emitters = new events.EventEmitter();

emitters.on('gengmin',test);

emitters.on('gengmin',function(a,b){
    console.log('2:'+a+'-'+b);
})

function test(a,b){
    console.log('1:'+a+'-'+b);
}

emitters.once('gengmin',test);

var http = require('http');

var server = http.Server();

server.on('request',function(req,res){
    res.writeHead(200,{"Content-Text":"text/html"});
    res.write('<h1>Node.js</h1>');
    res.end('<p>Hello,World!</p>');
    console.log('c');
});

console.log('a');
server.listen(3000);
console.log('b');
var http = require('http');
var url = require('url');
var util = require('util');

http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end(util.inspect(url.parse(req.url,true)));
}).listen(3000);

var http = require('http');
var querystring = require('querystring');
var util = require('util');

http.createServer(function(req,res){
    var post = '';

    req.on('data',function(chunk){
        post += chunk;
    });

    req.on('end',function(){
        post = querystring.parse(post);
        res.end(util.inspect(post));
    })
});
*/
var http = require('http');
var querystring = require('querystring');

var contents = querystring.stringify({
    name : 'gengmin',
    email : 'gengmin@meng10000.com',
    address : "TaiYuan.ShanXi"
});

var options = {
    host : 'www.meng10000.com',
    path : '/',
    method : 'POST',
    headers : {
        'Contents-Type':'application/x-www-form-urlencoded',
        'Contents-Length' : contents.length
    }
};

var req = http.request(options,function(res){
    res.setEncoding('utf-8');
    res.on('data',function(chunk){
        console.log(chunk);
    });
});

req.write(contents);
req.end();
