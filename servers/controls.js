import {login} from './API/login.js';



 let handle = {
       "/"(req, res) {
              res.writeHead(200, { "Content-Type": "text/html" });
              res.write('hello world');
              res.end();
       },
       "/api/login":login,
}
export{handle};