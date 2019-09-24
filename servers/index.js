import { server } from './server.js';
//import { login } from './API/contorl.js';
// server.addRoutes("/", (req, res) => {
//     res.writeHead(200, { "Content-Type": "text/html" });
//     res.write('hello world');
//     res.end();
// })
// server.addRoutes('/qq', (q, s) => { console.log(3333) })
// server.addRoutes('/xxx', (q, s) => { console.log(4444) })
// server.addRoutes('/api/login', login)
// server.start(server.handle,8888);
// 处理GET请求
let app = new server();
console.log(app)
app.get(function(req, res) {
        console.log('You send GET request')
    })
    // 处理POST请求
app.post(function(req, res) {
        res.end('You send POST request')
    })
    // 处理PUT请求
app.put(function(req, res) {
        res.end('You send PUT request')
    })
    // 处理DELETE请求
app.delete(function(req, res) {
    res.end('You send DELETE request')
})

app.listen(8888)