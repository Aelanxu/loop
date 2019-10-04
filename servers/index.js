import express from 'express'
import * as bodyParser from 'body-parser'
import { controlers } from './API/contorl.js';
const app = express();
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header("Access-Control-Allow-Headers", "X-Requested-With", "Content-Type, Accept")
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8")
    next();
});
//under have been to accept json config
app.use(bodyParser.default.json())
app.use(bodyParser.default.urlencoded({ extended: false })) //tip:resolve accept the data of post is undefind
app.use('/', controlers.lookUp)
app.post('/api/login', controlers.login)
app.post('/api/push', controlers.pushData)
app.get('/ab?cd', function(req, res) {
    res.send('ab?cd')
})


app.listen(8888)