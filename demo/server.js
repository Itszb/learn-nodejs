var http=require('http');

var server=http.createServer();
server.on('request',function(req,res){
    res.writeHead(200,{'Content-Type':'text/plain'});
    res.end('Hello world\n');
});

server.listen(3000);

console.log("server is running  at http://localhost:3000/");



//最简单的例子
var server=http.createServer(function(req,res){
    res.write('Hello World');
    res.end();
    //上面的两句可以合成下面一句
    res.end('Hello,World');
})
//设置响应头
var server=http.createServer(function(req,res){
    var body="hello world";
    res.setHeader('Content-Length',body.length);
    res.setHeader('Content-Type','text/plain');
    res.statusCode=304;
    res.end();
})


