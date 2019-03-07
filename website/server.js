//创建静态文件服务器

var http=require('http');
var fs=require('fs');
var path=require('path');
var mime=require('mime');
var cache={};
var charServer=require('./lib/chat_server');

//当请求文件不存在的时候 发送 404错误
function send404(response){
    response.writeHead(404,{'Content-Type':'text/plain'});
    response.write('Error 404: resource not found.');
    response.end();
}

//提供文件数据服务
function sendFile(response,filePath,fileContents){
    response.writeHead(200,{
        'Content-Type':mime.getType(path.basename(filePath)),
        // path.basename() 方法返回 path 的最后一部分
    });
    response.end(fileContents);
}
//访问内存(RAM)要比访问文件系统快得多，所以Node程序通常会把常用的数据缓存到内 存里。我们的聊天程序就要把静态文件缓存到内存中，只有第一次访问的时候才会从文件系统中 读取。

//提供静态文件服务
function serverStatic(response,cache,absPath){
    if(cache[absPath]){  //检查文件是否在缓存中
        sendFile(response,absPath,cache[absPath]);
    }else{
        fs.exists(absPath,function(exists){
            if(exists){
                fs.readFile(absPath,function(err,data){
                    if(err){
                        send404(response);
                    }else{
                        cache[absPath]=data;
                        sendFile(response,absPath,data);
                    }
                })
            }else{
                send404(response);
            }
        })
    }
}

var server=http.createServer(function(request,response){
    var filePath=false;
    if(request.url=='/'){
        filePath='public/index.html';
    }else{
        filePath='public'+request.url;
        //将url路径转为文件的相对路径
    }
    var absPath='./'+filePath;
    serverStatic(response,cache,absPath);
});


charServer.listen(server);

server.listen(3000,function(){
    console.log('Server listening on port 3000.');
})