import { server } from './server.js';
import { login } from './API/contorl.js';
server.addRoutes("/", (req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write('hello world');
    res.end();
})
server.addRoutes('/qq', (q, s) => { console.log(3333) })
server.addRoutes('/xxx', (q, s) => { console.log(4444) })
server.addRoutes('/api/login', login)
server.start(server.handle,8888);