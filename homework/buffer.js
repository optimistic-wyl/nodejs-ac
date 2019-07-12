const buf = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5]);
console.log(buf)
const json = JSON.stringify(buf);

// 输出: {"type":"Buffer","data":[1,2,3,4,5]}
console.log(json);

console.log('buffer.from:',Buffer.from([ 1, 2, 3, 4, 5 ]))

const copy = JSON.parse(json, (key, value) => {
    //console.log('key:',key)
    //console.log('value:',value)
    /* console.log(value && value.type === 'Buffer' ?
    Buffer.from(value.data) :
    '') */

    if(value && value.type === 'Buffer'){
        return Buffer.from(value.data)
    }
    return value
  /* return value && value.type === 'Buffer' ?
    Buffer.from(value.data) :
    value; */
});

// 输出: <Buffer 01 02 03 04 05>
console.log(copy);


var text = '{ "name":"Runoob", "initDate":"2013-12-14", "site":"www.runoob.com"}';  //json格式字符串
var obj = JSON.parse(text, function (key, value) {   //每个对象的属性调用此循环
	if (key == "initDate") {
	    return new Date(value);        //将日期对象返回
	} else {
	    return value;
}});

console.log(obj);