var http=require('http');
var formidable=require('formidable');
var util=require('util');
function upload(req,res){
    if(!isFormData(req)){
        res.statusCode=400;
        res.end('Bad Request: expecting multipart/form-data');
        return;
    }
    var form=new formidable.IncomingForm();
    form.uploadDir=__dirname;  //设置存放上传进来的图片的目录
    form.keepExtensions=true;   // true 存图片的时候带扩展名
    form.parse(req,function(err,fields,files){
        if(err) throw err;
        res.writeHead(200,{'Conent-Type':'text/plain'});
        res.write('received upload \n\n');
        // res.end(util.inspect({fields,files}));
    });
    form.on('progress',function(received,expected){
        var percent=Math.floor(received/expected * 100);

        res.writeHead(200,{'Content-Type':'text/html'});
        var html=
        `<div style="width:300px;height:20px;border:1px solid red;position:relative;">
            <div style="position:absolute;z-index:1;height:20px;width:${percent}%;background-color:green;"></div>
        <div>`
        res.write(html)
        //进度条的事情 怎么做到底?
        // console.log(percent);
    })
}
function isFormData(req){
    var type=req.headers['content-type'] || '';
    return 0==type.indexOf('multipart/form-data');
}
var server=http.createServer(function(req,res){
    switch (req.method){
        case "GET":
            show(req,res);
            break;
        case "POST":
            upload(req,res);
            break;
    }
})
server.listen(3000,function(){
    console.log('server is running at 3000')
})
    
function show(req,res){
    var html=
        `<form method="post" action="/" enctype="multipart/form-data">
            <p><input type="text" name="name"></p>
            <p><input type="file" name="file"></p>
            <P><input type="submit" value="upload"></P>
        </form>
        `
        res.setHeader('Content-Type','text/html');
        res.setHeader('Content-Length',Buffer.byteLength(html));
        res.end(html);
}

