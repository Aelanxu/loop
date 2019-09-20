import * as querystring from 'querystring';
import {cData} from '../data/data.js';
import {getD} from '../getdata.js';


function login(req,res){
        getD.POST(req,res).then((data)=>{
               console.log(querystring.parse(data));

               cData.add('users',querystring.parse(data)).then(result=>{console.log(result)})
               
        })

            

}        
//     let postData="";
//     req.setEncoding('utf-8')
  
//     req.on('data',function(chunk){
//            postData+=chunk;
//     })
//     req.on('end',function(){
//            if(postData!==""){
              
//             postData=querystring.parse(postData);
//             postData=JSON.stringify(postData);
//             res.writeHead(200, { "Content-Type": "application/json" });
           
           
//             cData.find('jsondata').then((data)=>{
//                    console.log(data);
//                    res.end(JSON.stringify(data));
//             })
//             //cData.add('jsondata',JSON.parse(postData))
         
           
//            }else{
//             let mes={mes:'nodata'}
//             res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
//             res.write(mes.mes);
//             res.end();
//            }
           
           
//     })
  

export {login};