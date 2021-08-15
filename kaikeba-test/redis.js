const Koa = require('koa')
const app = new Koa()
const session = require('koa-session')
// koa-redis
const redisStore = require('koa-redis');
const redis = require('redis')
const redisClient = redis.createClient(6379, "localhost");
const wrapper = require('co-redis');
const client = wrapper(redisClient);

app.keys = ['some secret'];
// 注册 
app.use(session({
    key: 'kkb:sess', 
    store: redisStore({ client }) // 此处可以不必指定client 
}, app));

app.use(async (ctx, next) => {
    //client.set('test11', 'oooop')
    const keys = await client.keys('*')
    keys.forEach(async key => 
        console.log(await client.get(key))
    )
    await next()
})

app.use(ctx => {
    if (ctx.path === '/favicon.ico') return;
    // 获取 
    let n = ctx.session.count || 0; 
    // 设置 
    ctx.session.count = ++n; 
    ctx.body = '第' + n + '次访问'; 
});

app.listen(3000, () => {
    console.log('服务器启动了')
})