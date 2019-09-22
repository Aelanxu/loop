  import * as http from 'http';
  import * as url from 'url';
  import { router } from './router.js';

  class server extends router {
      static getInstance() {
          if (!server.instance) {
              server.instance = new server()
          }
          return server.instance;
      };
      constructor() {
          super();
      }

      start(handle, port, func) {
              let that = this;

              function onRequest(req, res) {
                  // 添加响应头实现跨域
                  res.setHeader("Access-Control-Allow-Origin", "*");

                  let pathname = url.parse(req.url).pathname;
                  console.log(pathname)
                      // 关闭nodejs 默认访问 favicon.ico
                  if (!pathname.indexOf('/favicon.ico')) {
                      return;
                  };
                  that.route(handle, pathname, req, res);

              }
              http.createServer(onRequest).listen(port, func);
              console.log("开始运行")
          } //



  }

  server = server.getInstance();

  export { server };