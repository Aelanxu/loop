'use strict';
import * as http from 'http'
let  res = Object.create(http.ServerResponse.prototype)

res.send =function send(body){
    console.log(1111)

}
export default res