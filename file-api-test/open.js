var fs = require("fs");
var path = require('path')

// 异步打开文件
console.log("准备打开文件！");
fs.open('input.txt', 'w', function(err, fd) {
   if (err) {
       return console.error(err);
   }
  console.log("文件打开成功！");
  console.log(fd)  
  
  fs.write(fd, '++我是通 过fs.writeFile写入的内容++', function(err) {
    if (err) {
        return console.error(err);
    }
    console.log("数据写入成功！");
   });
});

fs.open('other1.txt','w',function(err,fd){
    if (err) {
        return console.error(err);
    }
   console.log('other1.txt:',"文件打开成功！");
   console.log(fd) 
})

fs.open('other2.txt','w',function(err,fd){
    if (err) {
        return console.error(err);
    }
   console.log('other2.txt:',"文件打开成功！");
   console.log(fd) 
})

fs.open('other3.txt','w',function(err,fd){
    if (err) {
        return console.error(err);
    }
   console.log('other3.txt:',"文件打开成功！");
   console.log(fd) 
})


/* var fs = require('fs');
fs.open('input.txt', 'r', function (err, fd) { 
    var readBuffer = new Buffer(1024),  offset = 0, len = readBuffer.length, filePostion = 100; 
    fs.read(fd, readBuffer, offset, len, filePostion, function(err, readByte){   
        console.log('读取数据总数：'+readByte+' bytes' );          // ==>读取数据总数：239 bytes console.log(readBuffer.slice(0, readByte)); //数据已被填充到readBuffer中 
    })
}) */

const fn = async () => {
    const data = await new Promise((resovle,reject) => {
        fs.readFile('input.txt','utf-8',(err,data) => {
            if(err) return reject(err)
            resovle(data)      
        })
    })
    //console.log(data,111);
    return data
}

//console.log(fn(),222);
fn().then(function(data){
    console.log(data,222)
})

async function readFileList(path, filesList) {
    let data = await new Promise((resovle,reject) => {
        fs.readdir(path,function(err,files){
            if(err) {
                console.error(err)
            }
    
            files.forEach(function (itm, index) {
                var stat = fs.statSync(path + itm);
                if (stat.isDirectory()) {
                //递归读取文件
                    readFileList(path + itm + "/", filesList)
                } else {
        
                    var obj = {};//定义一个对象存放文件的路径和名字
                    obj.path = path;//路径
                    obj.filename = itm//名字
                    filesList.push(obj);
                }
        
            })

            resovle(filesList);
    
        });
    })

    return data;
    
}

console.log(__dirname)
console.log(path.resolve('input.txt'));
console.log('path.sep:',path.sep)
console.log('path.delimiter:',path.delimiter)
//console.log('path.posix:',path.posix)
//console.log('path.win32:',path.win32)
let filesList = [];
readFileList(`${path.normalize(__dirname)}/`,filesList).then(function(data){
    console.log(filesList)
    console.log(filesList.length)
})

