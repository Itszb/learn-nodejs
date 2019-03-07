const fs =require('fs');

fs.readFile('./index.html','utf8',function(err,file){
    if(err) throw err;
    console.log(file);
});


