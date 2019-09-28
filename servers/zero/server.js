  import * as http from 'http'
  import * as methods from 'methods'
  import * as mixin from 'merge-descriptors'
  import * as Router from './router/index.js'
  import * as res from './response.js'

  const slice = Array.prototype.slice

  function loop() {

      //console.log(Router)
      const app = function(req, res, next) {

          app.handle(req, res, next)
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
      router.handle(req, Object.setPrototypeOf(res,this.response.default))

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
             
          return this
      }
  })

  proto.response = Object.create(res, {
      proto: { configurable: true, enumerable: true, writable: true, value: proto }
  })





  export default loop