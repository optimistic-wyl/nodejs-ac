const http = require('http')

http.createServer((req, res) => {
    console.log(req.headers)
    res.end('ooops')
})
.listen(3000, () => {
    console.log('服务已启动')
})