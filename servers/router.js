
class router {
    
    static getInstance(){
        if(!router.instance){
            router.instance =new router()
        }
        return router.instance;
    };
    constructor() {

        this.handle = {
            "/"(req, res) {
                res.writeHead(200, { "Content-Type": "text/html" });
                res.write('hello world');
                res.end();
            }
        
        }

    };

 
    route(handle, pathname, req, res) {

        if ((typeof handle[pathname] === 'function') && (handle.hasOwnProperty(pathname))) {
            console.log(handle[pathname])
            return handle[pathname](req, res);

        } else {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.write('404 Not Found')
            res.end();
        };

    };

    addRoutes(pathName, func) {

        if (pathName) {
            console.log(pathName)
            this.handle[pathName] = func;
            console.log(this.handle[pathName])
            //return handle;
        } else {
            console.log('not allowd empity!');
        }
    };

}
router=router.getInstance();

export {router};