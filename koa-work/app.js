const Koa = require('koa')
const router = require('koa-router')()

const app = new Koa()

app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

app.use(async (ctx,next) => {
    if(ctx.request.path == '/'){
        ctx.response.body = '我是测试首页页面,index page';
    } else {
        await next()
    }
})

router.get('/hello/:name', async (ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = `<h1>Hello, ${name}!</h1>`;
})

app.use(router.routes())
app.listen(3000);
console.log('app started at port 3000...');
