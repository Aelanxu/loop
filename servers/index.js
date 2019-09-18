import {start} from './server.js';
import {router} from './router.js';
import {login} from './API/login.js';
router.addRoutes('/qq',(q,s)=>{console.log(3333)})
router.addRoutes('/xxx',(q,s)=>{console.log(4444)})
router.addRoutes('/api/login',login)

start(router.route,router.handle);
