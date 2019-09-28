'use strict';
import * as http from 'http'
let res = Object.create(http.ServerResponse.prototype)
    //
res.send = function(values) {
        //check arguments 
        let body = values
        if (arguments.length === 2) {
            if (typeof arguments[0] !== 'number' && typeof arguments[1] === 'number') {
                this.statusCode = arguments[1]
                this.writeHead(200, { 'Content-Type': 'text/plain;charset = utf-8 ' })
                body = '*need the first argument is Number!*'
                this.end(body)

            } else {
                this.statusCode = arguments[0]
                this.writeHead(this.statusCode, { 'Content-Type': 'text/html;charset =utf-8' })
                body = arguments[1]
                this.end(body)

            }
            if (typeof arguments[0] === 'number' && arguments.length === 1) {
                this.writeHead(200, { 'Content-Type': 'text/plain;charset = utf-8' })

                body = arguments[0]


            }


        }
        if (req.fresh) this.statusCode = 304;
        if (204 === this.statusCode || 304 === this.statusCode) {
            this.removeHeader('Content-Type');
            this.removeHeader('Content-Length');
            this.removeHeader('Transfer-Encoding');
            body = '';
        }
        this.writeHead(200, { 'Content-Type': 'text/plain' })
        this.end(body)
        return this

    } //


export default res