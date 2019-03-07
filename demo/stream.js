//可以吧 数据流 看成特殊的数组,只不过数组中的数据分散在空间上
//而数据流中的数据分散在时间上 通过将数据一块一块的传送,开发人员可以每收到一块数据就开始处理.而不用等所有数据都到全了再做处理.


/*

var fs=require('fs');
var stream=fs.createReadStream('./index.html');
stream.on('data',function(chunk){
    console.log(chunk);
})
stream.on('end',function(){
    console.log('finished');
})

*/

//只要有新的数据块准备好，就会激发data事件，当所有数据块都加载完之后，会激发一个 end事件。由于数据类型不同，数据块的大小可能会发生变化。有了对读取流的底层访问，程序 就可以边读取边处理，这要比等着所有数据都缓存到内存中再处理效率高得多。

//Node中也有可写数据流，可以往里写数据块。当HTTP服务器上有请求过来时，对其进行响应的res对象就是可写数据流的一种。

//可读和可写数据流可以连接起来形成管道


var http=require('http');
var fs=require('fs');
http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type':'image/jpg'});
    fs.createReadStream('./pin.jpg').pipe(res);
}).listen(3000);

console.log('server is running at http://localhost:3000')

//在这行代码中，数据从文件中读进来(fs.createReadStream)，然后数据随着进来就被 送到(.pipe)客户端(res)。在数据流动时，事件轮询还能处理其他事件。


//事件驱动的小程序
//这个程序表明了node如何通知处理传统的http数据  比如静态文件,和实时数据(聊天消息)通过他还能看出node程序是如何组织的,以及依赖项是如何管理的.

//node是如何同时处理http和websocket,这是选他做实时程序最好的理由之一.

//node对目录结构没有任何特殊的要求,你可以根据自己的喜好随意组织程序文件

