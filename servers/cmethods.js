import * as methods from 'methods'
import { Layer } from './router/layer.js';
class cmethods {
    constructor() {

        this.handles = [];
        this.pushMethod();

    };

    handle(req, res) {
            for (let i = 0; i < this.handles.length; i++) {
                const layer = this.handles[i]
                layer.handle_request(req, res);
            }

        } //

    test() {
        console.log(1111)
    }
    pushMethod() {
            let _self = this;
            console.log(methods.default)
            methods.default.forEach(function(method) {
                //console.log(method)
                _self[method] = function(fn) {
                    const layer = new Layer(method, fn);
                    _self.handles.push(layer);
                }
            })


        } //
}
export { cmethods };