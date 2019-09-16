  import * as http from 'http';
  import * as url from 'url';

function start(route,handle){
    function onRequest(req,res){
          // 添加响应头实现跨域
          res.setHeader("Access-Control-Allow-Origin", "*"); 
          
        let pathname=url.parse(req.url).pathname;
          // 关闭nodejs 默认访问 favicon.ico
          if (!pathname.indexOf('/favicon.ico')) {
            return; 
          };
     
        console.log(pathname)
         route(handle, pathname,req,res);
     
    }
    http.createServer(onRequest).listen(8888);
    console.log("开始运行")
}

export {start};