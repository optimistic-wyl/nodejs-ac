// index:

module.exports = {
    'GET /': async (ctx, next) => {
        ctx.render('index.html', {
            title: 'Welcome'
        });
    },
    'POST /restful': async (ctx, next) => {
        // ctx.response.type = 'text/json';
        ctx.response.body = {a: 1};
    },
};
