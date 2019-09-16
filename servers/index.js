import {start} from './server.js';
import {route} from "./router.js";
import {handle} from'./controls.js';

start(route,handle);
