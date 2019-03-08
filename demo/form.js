var http=require('http');
var qs=require('querystring');
var items=[];
var server=http.createServer(function(req,res){
    if('/'==req.url){
        switch (req.method){
            case "GET":
                show(res);
                break;
            case "POST":
                add(req,res);
                break;
            default:
                badRequest(res);
        }
    }else{
        notFound(res);
    }
})
server.listen(3000,function(){
    console.log('server is running at port 3000');
})

function show(res){
    var html=
        `<html>
            <head>
                <title>play egg errrr </title>
            </head>
            <body>
                <h1>todo list</h1>
                <ul>
                ${items.map(obj=>`<li>${obj}</li>`)}
                <ul>
                <form method="post" action="/">
                    <p><input name="item" /></p>
                    <p><input type="submit" value="add item" /></p>
                </form>
            </body>
        </html>`;
    res.setHeader('Content-Type','text/html');
    res.setHeader('Content-Length',Buffer.byteLength(html));
    res.end(html);
}
function notFound(res){
    res.statusCode=404;
    res.setHeader('Content-type','text/plain');
    res.end('Not Found');
}
function badRequest(res){
    res.statusCode=400;
    res.setHeader('Content-Type','text/plain');
    res.end('Bad request');
}

function add(req,res){
    var body="";
    req.setEncoding('utf8');
    req.on('data',function(chunk){
        body+=chunk;
    })
    req.on('end',function(){
        var obj=qs.parse(body);
        console.log(obj);
        items.push(obj.item);
        show(res);
    })
}