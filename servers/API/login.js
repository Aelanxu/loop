import * as querystring from 'querystring';
function login(req,res){
       console.log('run start')
    let postData="";
    req.setEncoding('utf-8');
  
    req.on('data',function(chunk){
           postData+=chunk;
    })
    req.on('end',function(){
           if(postData!==""){
              
            postData=querystring.parse(postData);
            //postData=JSON.parse(postData);
            res.writeHead(200, { "Content-Type": "application/json" });
           
            res.write(JSON.stringify(postData));
            console.log(postData)
            res.end();
           }else{
            let mes={mes:'nodata'}
            res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
            res.write(mes.mes);
            res.end();
           }
           
           
    })
  
}

export {login};