'use strict';
import * as http from 'http'
let res = Object.create(http.ServerResponse.prototype)

    res.send=function(body){
        this.writeHead(200,{'Content-Type': 'text/plain' })
        this.end(body)
        return this
    }
 

export default res