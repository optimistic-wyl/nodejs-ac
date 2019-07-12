var http = require('http')
var fs = require('fs')
var url = require('url')

var server = http.createServer().listen(8080, () => {
    console.log('---服务器已经启动，监听的端口号是8080')
});

server.on('request',function(req,res){
    console.log('req.url:',req.url)
    if(req.url!=="/favicon.ico"){
        
        //res.write('hello world')
        var pathname = url.parse(req.url).pathname;

        // 输出请求的文件名
        console.log("Request for " + pathname + " received.");


        // 从文件系统中读取请求的文件内容
        fs.readFile(pathname.substr(1), function (err, data) {
            if (err) {
                console.log(err);
                // HTTP 状态码: 404 : NOT FOUND
                // Content Type: text/html
                res.writeHead(404, {'Content-Type': 'text/html'});
            }else{             
                // HTTP 状态码: 200 : OK
                // Content Type: text/html
                res.writeHead(200, {'Content-Type': 'text/html'});    
                
                // 响应文件内容
                res.write(data.toString());        
            }
            //  发送响应数据
            res.end();
        }); 
    }
});