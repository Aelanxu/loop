import * as querystring from 'querystring';

import { cData } from './data/data.js';

//router for url
class router {

    constructor() {

        this.handle = {}

    }; //



    route(handle, pathname, req, res) {
        // static router
        if ((typeof handle[pathname] === 'function') && (handle.hasOwnProperty(pathname))) {
            console.log(handle[pathname])
            return handle[pathname](req, res);

        } else {
            //ative router is response json
            let data = { pathname }
            cData.find('jsondata', data).then((data) => {
                if (data.length > 0) {
                    console.log(data)
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.end(JSON.stringify(data));
                } else {
                    res.writeHead(404, { "Content-Type": "text/plain" });
                    res.write('404 Not Found')
                    res.end();
                }

            });

        };

    };
    //

    addRoutes(pathName, func) {

        if (pathName) {
            //console.log(pathName)

            this.handle[pathName] = func;


        } else {
            console.log('*pathName is empity*');
        }
    }; //



}


export { router };