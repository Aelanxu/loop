//封装get/post 的方法用于复用9/18

class sent {

    constructor() {

    };
    static getInstance() {
        if (!sent.instance) {
            sent.instance = new sent()
        }
        return sent.instance;
    };
    json(res, data) {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.write(JSON.stringify(data));
            res.end();
        } //
    html(res, data) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        res.end();
    }
    value(res, data) {
        res.writeHead(200, { "Content-Type": "application/x-www-form-urlencoded" });
        res.write(data);
        res.end();
    }

}
sent = sent.getInstance();
export { sent }