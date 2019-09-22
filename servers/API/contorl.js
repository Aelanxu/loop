import * as querystring from 'querystring';
import { cData } from '../data/data.js';
import { sent } from '../sentData.js'


function login(req, res) {

    let postData = '';

    req.setEncoding('utf-8');
    req.on('data', (chunk) => {

        postData += chunk;

    });
    req.on('end', () => {
        if (postData) {

            cData.add('users', querystring.parse(postData)).then(result => {
                console.log(result.insertedId.toHexString()) //获取返回的ID
                let resData = { data: result.ops }
                console.log(result.ops)
                sent.json(res, resData)


            })

        } else {
            console.log('*no get data*')
        }
    });






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


export { login };