var express = require('express')
var fs = require('fs')
var url = require('url')

var app = express()

app.get('/', function (req, res) {
    res.send('Hello World');
})

app.get('/index.html', function (req, res) {
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
            }else{
                // HTTP 状态码: 200 : OK
                //res.sendStatus(200);

                // Content Type: text/html
                res.header('Content-Type', 'text/html;charset=utf-8'); 
                //res.sendStatus(200);
                // 响应文件内容
                res.send(data.toString());        
            }
        }); 
    }
})

var server = app.listen(8080,function(){
    var host = server.address().address
    var port = server.address().port
 
    console.log(host,port)
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})