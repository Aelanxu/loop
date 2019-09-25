  import * as http from 'http';
  import * as methods from 'methods'
  import { Layer } from './router/layer.js';
  import * as mixin from 'merge-descriptors';
  import {Route,slice}from './router/router.js';

   export default function loop() {


    const app = function (req, res) {
      return  app.handle(req,res)
    }
    
    mixin.default(app, proto, false)
    app.init()
    return app
  }
  const proto = Object.create(null)
  proto.listen = function (port) {
    const server = http.createServer(this)
    return server.listen.apply(server, arguments)
  }
   proto.init=function(){

    this.route=new Route()

   }
   proto.handle=function (){
       this.route.dispatch.apply(this.route,slice.call(arguments))
   }
   methods.default.forEach(function(method) {
    //console.log(method)
    proto[method] = function(fn) {
       this.route[method].apply(this.route,slice.call(arguments))
    }
   } )
   
