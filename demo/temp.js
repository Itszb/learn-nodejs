var http=require('http');
var url=require('url');
var fs=require('fs');
var items=[];
var server=http.createServer(function(req,res){

    req.pipe(fs.createWriteStream('./txt.txt'))
    
    switch(req.method){
        case 'POST':
            var item=''
            req.setEncoding('utf8')
            req.on('data',function(chunk){
                item+=chunk
            })
            req.on('end',function(){
                items.push(item)
                res.end('OK\n')
            })
            break;
        case 'GET':
            var body=items.map(function(item,i){
                return `${i}):${item}`
            }).join('\n');
            res.setHeader('Content-Length',Buffer.byteLength(body));
            res.setHeader('Content-Type','text/plain;charset="utf-8"');
            res.end(body);
            break;
        case 'DELETE':
            var path=url.parse(req.url).pathname;
            var i=parseInt(path.slice(1),10);
            if(isNaN(i)){
                res.statusCode=400
                res.end('Invalid item id');
            }else if(!items[i]){
                res.statusCode=400
                res.end('Item not found')
            }else{
                items.splice(i,1)
                res.end('OK\n')
            }
            break;
        case 'PUT':
            var path=url.parse(req.url).pathname;
            var i=parseInt(path.slice(1),10);
            var item='';
            req.setEncoding('utf8');
            req.on('data',function(chunk){
                item+=chunk;
            });

            req.on('end',function(){
                if(isNaN(i)){
                    res.statusCode=400
                    res.end('Invalid item id');
                }else if(!items[i]){
                    res.statusCode=400
                    res.end('Item not found')
                }else{
                    items.splice(i,1,item)
                }

                res.end('OK\n');
            })
            break;
    }
})
server.listen(3000,function(){
    console.log("服务器运行在 http://localhost:3000");
})


// curl http://localhost:3000   get请求
// curl -d 'hello' http://localhost:3000  -d 表示post请求 并且紧跟其后的是请求参数