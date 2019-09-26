  import * as http from 'http';
  import * as methods from 'methods'
  import * as mixin from 'merge-descriptors';
  import * as Router from './router/index.js';
  const slice = Array.prototype.slice

  export default function loop() {

      //console.log(Router)
      const app = function(req, res) {
          app.handle(req, res)
      }

      mixin.default(app, proto, false)

      return app
  }
  const proto = Object.create(null)
  proto.listen = function(port) {
      const server = http.createServer(this)
      return server.listen.apply(server, arguments)
  }



  proto.lazyrouter = function lazyrouter() {

      if (!this._router) {
          this._router = new Router.default({});
      }
  }

  proto.param = function() {
      this.lazyrouter()
      this._router.param.apply(this._router, slice.call(arguments))
      return this
  }

  proto.handle = function(req, res, callback) {
      const router = this._router
      router.handle(req, res)
          //console.log(router.handle)
  }

  proto.use = function() {
      const router = this._router
      router.use.apply(router, Array.prototype.slice.call(arguments))
  }

  methods.default.forEach(function(method) {

      proto[method] = function(path) {

          this.lazyrouter()
          const route = this._router.route(path)
          route[method].apply(route, slice.call(arguments, 1))
              //console.log(route)
              //console.log(this._router)
          return this
      }
  })