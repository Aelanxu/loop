import { Route } from "./router.js"
import { Layer } from "./layer.js"
import * as methods from 'methods'
import * as parseUrl from 'parseurl'
import flatten from 'array-flatten'

const setPrototypeOf = Object.setPrototypeOf
const slice = Array.prototype.slice



export default function proto(options) {
   const router= function(req, res, next) {
        router.handle(req, res, next)
    }
    setPrototypeOf(router, proto)
    router.params = {}

    router.stack = []
    return router
}

proto.param = function param(name, fn) {
    (this.params[name] = this.params[name] || []).push(fn)
}
proto.process_params = function processParams(layer, req, res, done) {
    const params = this.params
    const keys = layer.keys
    if (!keys || keys.length === 0) {
        return done()
    }
    let i = 0
    let name
    let paramIndex = 0
    let key
    let paramVal
    let paramCallbacks

    function param() {
        if (i >= keys.length) {
            return done()
        }
        paramIndex = 0
        key = keys[i++]
        name = key.name
        paramVal = req.params[name]
        paramCallbacks = params[name]
        if (paramVal === undefined || !paramCallbacks) {
            return param()
        }
        paramCallback()
    }

    function paramCallback() {
        const fn = paramCallbacks[paramIndex++]
        if (!fn) return param()
        try {
            fn(req, res, paramCallback, paramVal, key.name)
        } catch (e) {
            throw e
        }
    }

    param()
}

proto.route = function route(path) {
    const route = new Route(path)
    const layer = new Layer(path, {}, route.dispatch.bind(route))
    layer.route = route
    this.stack.push(layer)
    return route
}
methods.default.forEach(function(method) {
    proto[method] = function(path) {
        const route = this.route(path)
        route[method].apply(route, slice.call(arguments, 1))
        return this
    }
})
proto.handle = function handle(req, res, out) {
        const self = this
        const stack = this.stack
        let idx = 0
        const finalHandler = function(req, res) {
            console.log('reach final handler')
        }
        next()

        function next(err) {
            const layerError = err
            if (err === 'router') {
                setImmediate(finalHandler, null)
                return
            }
            if (idx >= stack.length) {
                return setImmediate(finalHandler, null)
            }
            const path = getPathname(req)
            let layer
            let match
            let route
            while (match !== true && idx < stack.length) {
                layer = stack[idx++]
                match = matchLayer(layer, path)
                route = layer.route
                if (match !== true) {
                    continue
                }
                if (!route) {
                    continue
                }
                if (layerError) {
                    match = false
                    continue
                }
                const method = req.method
                const hasMethod = route._handle_method(method)
                if (!hasMethod) {
                    match = false
                    continue
                }
            }
            if (match !== true) {
                return finalHandler(layerError)
            }
            req.params = layer.params
            self.process_params(layer, req, res, function(err) {
                if (err) {
                    return next(layerError || err)
                }
                if (route) {
                    return layer.handle_request(req, res, next)
                }
                if (layerError) {
                    layer.handle_error(layerError, req, res, next)
                } else {
                    layer.handle_request(req, res, next)
                }
            })
        }
    }
    // get pathname of request
function getPathname(req) {
    try {
        return parseUrl(req).pathname
    } catch (err) {
        return undefined
    }
}

function matchLayer(layer, path) {
    try {
        return layer.match(path)
    } catch (err) {
        return err
    }
}

proto.use = function use(path, fn) {
    var callbacks = flatten(slice.call(arguments, 1))
    for (var i = 0; i < callbacks.length; i++) {
        var handle = callbacks[i]

        var layer = new Layer(path, {
            sensitive: this.caseSensitive,
            strict: false,
            end: false
        }, handle)

        layer.route = undefined

        this.stack.push(layer)
    }

    return this
}