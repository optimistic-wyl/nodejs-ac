var a = require('./mod1');

console.log(a);

/* var http = require("http");

http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.end();
}).listen(8888); */
// 检验Object.keys()方法，for in循环，objInstance.hasOwnProperty()
function fun(){
  this.a = 'a'
  this.b = 'b'
}

fun.prototype.c = 'c'

let funObj = new fun();

for (key in funObj){
  if (funObj.hasOwnProperty(key)) {
    console.log('ownProperty:',key)
  } else {
    console.log('prototypeProperty:',key)
  }
}

console.log(Object.keys(funObj))

//去重
let v=[1,1,3,3,2,4,4,5,2,2]

function removeDup(arr){
  let json ={};
  for(i in arr){
    json[arr[i]] = '';
  }
  console.log(Object.keys(json))
}

removeDup(v);

//统计字符个数及最多的字符数
let str = 'aaaccbbbbeeeffcbgg'

function strProcess(str){
  let json={};
  for(let i in str){
    if (json[str[i]]) {
      json[str[i]]++
    }else{
      json[str[i]]=1
    }
  }

  return json
}

let json = strProcess(str);
console.log(json)
console.log(Object.keys(json).length)
