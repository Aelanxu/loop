import loop from './server.js';
//import { login } from './API/contorl.js';
let app = loop();

app.get('/', function(req, res) {
    res.end('You send GET request')
})
app.get('/name', function(req, res) {
        res.end('You send POST request')
    })
    //     // 处理PUT请求
    // app.put(function(req, res) {
    //         res.end('You send PUT request')
    //     })
    //     // 处理DELETE请求
    // app.delete(function(req, res) {
    //     res.end('You send DELETE request')
    // })

app.listen(8888)