exports.a = 'a'
exports.b = 'b'

/* module.exports = {
    a: 'a',
    b: 'b'
} */



//hello.js 
function Hello() { 
    var name; 
    this.setName = function(thyName) { 
        name = thyName; 
    }; 
    this.sayHello = function() {
        console.log('Hello ' + name); 
    }; 
}; 
//exports = Hello
//exports.hello = Hello;
module.exports = Hello;


