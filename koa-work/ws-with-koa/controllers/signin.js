// sign in:
const fs = require('fs');
const path = require('path');
var index = 0;

module.exports = {
    'GET /signin': async (ctx, next) => {
        let names = '甲乙丙丁戊己庚辛壬癸';
        let name = names[index % 10];
        ctx.render('signin.html', {
            name: `路人${name}`
        });
    },

    'POST /signin': async (ctx, next) => {
        index ++;
        let name = ctx.request.body.name || '路人甲';
        let user = {
            id: index,
            name: name,
            image: index % 10
        };
        let value = Buffer.from(JSON.stringify(user)).toString('base64');
        console.log(`Set cookie value: ${value}`);
        ctx.cookies.set('name', value);
        ctx.response.redirect('/');
    },

    'GET /signout': async (ctx, next) => {
        ctx.cookies.set('name', '');
        ctx.response.redirect('/signin');
    },

    'POST /upload': async (ctx, next) => {
        // let file = ctx.request.file; // 获取上传文件

        //const file = ctx.request.files.file; // 上传的文件在ctx.request.files.file
        // 创建可读流
        //const reader = fs.createReadStream(file.path);
        // 修改文件的名称
        //var myDate = new Date();
        //var newFilename = myDate.getTime()+'.'+file.name.split('.')[1];
        //var targetPath = path.join(__dirname, '../public/upload/') + `/${newFilename}`;
        //创建可写流
        //const upStream = fs.createWriteStream(targetPath);
        // 可读流通过管道写入可写流
       // reader.pipe(upStream);
        //返回保存的路径
        return ctx.body = { code: 200 };
    },
};
