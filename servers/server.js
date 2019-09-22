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

      start(handle,port) {
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
          http.createServer(onRequest).listen(port);
          console.log("开始运行")
      }
      POST(req,res){
        let postData='';
       return new Promise((resolve,reject)=>{
              req.setEncoding('utf-8');
              req.on('data',(chunk)=>{
               
               postData+=chunk;
               
              });
              req.on('end',()=>{
                     if(postData){
                        
                       resolve(postData);
                       res.end();
                       return;
                      
                      }else{
                       reject('I can not get data！');
                       res.end();
                      }
         });
       });

   }

   GET(req,res){
       let params="";
       return new Promise((resolve,reject)=>{

           params=url.parse(req.url,true).query;
           if(params){
               resolve(params);
               res.end();
               return;
           }else{
               reject(`I can't get any params!`);
               res.end();
           }
       })
   };
   //
  }

  server = server.getInstance();

  export { server };