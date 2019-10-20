import express from 'express'
import * as bodyParser from 'body-parser'
import { controlers } from './API/contorl.js'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
const __filename = fileURLToPath(
    import.meta.url)
const __dirname = dirname(__filename)
const app = express();
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header("Access-Control-Allow-Headers", "X-Requested-With", "Content-Type, Accept")
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8")
    next();
});
app.use(express.static(join(__dirname, '../dist')));
//under have been to accept json config
app.use(bodyParser.default.json())
app.use(bodyParser.default.urlencoded({ extended: false })) //tip:resolve accept the data of post is undefind
app.use('/', controlers.lookUp)
app.post('/login', controlers.login) //login interface
app.post('/push', controlers.pushData) //write data interface
app.post('/read', controlers.read)
app.post('/updata', controlers.update)


app.listen(80)