'use strict'
import * as pathRegexp from 'path-to-regexp'
const hasOwnProperty = Object.prototype.hasOwnProperty


function Layer(path, options, fn) {
    const opts = options || {}
    this.handle = fn
    this.name = fn.name || '<anonymous>'
    this.params = undefined
    this.path = undefined
    this.regexp = pathRegexp.default(path, this.keys = [], opts)
    this.regexp.fast_star = path === '*'
    this.regexp.fast_slash = path == '/'
}
Layer.prototype.handle_method = function(req) {
    return this.method.toLowerCase() === req.method.toLowerCase()
}
Layer.prototype.handle_request = function(req, res, next) {

    const fn = this.handle

    if (fn.length > 3) {
        return next()
    }

    try {
        fn(req, res, next)
    } catch (err) {
        next(err)
    }
}
Layer.prototype.match = function match(path) {
    let match
    if (path != null) {
        if (this.regexp.fast_slash) {
            this.prams = {}
            this.path = ''
            return true
        }
        match = this.regexp.exec(path)
    }
    if (!match) {
        this.params = undefined
        this.path = undefined
        return false
    }
    this.params = {}
    this.path = match[0]

    const keys = this.keys
    const params = this.params
    for (let i = 1; i < match.length; i++) {
        const key = keys[i - 1]
        const prop = key.name
        const val = match[i]
        if (val !== undefined || hasOwnProperty.call(params, prop)) {
            params[prop] = val
        }
    }
    return true
}

Layer.prototype.handle_error = function handleError(error, req, res, next) {
    const fn = this.handle
    if (fn.length !== 4) {
        return next(error)
    }

    try {
        fn(error, req, res, next)
    } catch (err) {
        next(err)
    }
}
export { Layer }