'use strict';

var s = 'Hello';

function greet(name) {
    console.log(s + ', ' + name + '!');
}

// module.exports = greet;

// exports.greet = greet;

/* module.exports = {
    a: 'a'
} */

exports.b = {
    a: 'a'
}