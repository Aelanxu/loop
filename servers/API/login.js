import * as querystring from 'querystring';
import {cData} from '../data/data.js';
function login(req,res){

    let postData="";
    req.setEncoding('utf-8');
  
    req.on('data',function(chunk){
           postData+=chunk;
    })
    req.on('end',function(){
           if(postData!==""){
              
            postData=querystring.parse(postData);
            postData=JSON.stringify(postData);
            res.writeHead(200, { "Content-Type": "application/json" });
           
            res.write(postData);
            cData.add('jsondata',JSON.parse(postData))
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