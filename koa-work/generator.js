function readFile(filename){
    return new Promise((resolve, reject) => {
        fs.readFile(filename,function(err,data){
            // console.log(data.toString());
            resolve(data.toString());
        })
    })
}

function* gen (){
    try {
        r1 = yield readFile('./views/base.html');
        console.log('==================================',r1);
        r2 = yield readFile('./views/extend.html');
        console.log('==================================',r2);
        r3 = yield readFile('./views/hello.html');
        console.log('==================================',r3);
    }
    catch (err) {
        console.log('err')
    }
}

/*
//手动执行
let g = gen();

 let i = g.next().value
i.then(function(data){
    return g.next(data).value
}).then(function(data){
    return g.next(data).value
}).then(function(data){
    return g.next(data)
}) */

// 自动执行
/* function run(fn) {
    var gen = fn();
  
    function next(data) {
      var result = gen.next(data);
      if (result.done) return;
      result.value.then(function(data){
        next(data);
      });
    }
  
    next();
  }
  
run(gen); */


function* next_id() {
    for(i = 1; i< 100; i++){
        yield i
    }
}


// 测试:
// 测试:
/* var
    x,
    pass = true,
    g = next_id();
for (x = 1; x < 100; x ++) {
    let v = g.next().value;
    console.log(v);
    if (v !== x) {
        pass = false;
        console.log('测试失败!');
        break;
    }
}
if (pass) {
    console.log('测试通过!');
} */

function* genArg(){
    if (yield 1){
        console.log('值为真')
    } else {
        console.log('值为假')
    }
}

const ga = genArg()
ga.next()
//ga.next(false)
ga.next(true)