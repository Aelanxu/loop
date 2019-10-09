import { cData } from '../data/data.js'
import * as url from 'url'
import { runInNewContext } from 'vm'

const controlers = Object.create(null)
    //look up the path
controlers.lookUp = function(req, res, next) {
    let pathname = url.parse(req.url).pathname
    console.log(pathname)
    cData.find('jsondata', { path: pathname }).then(result => {
        //console.log(result)
        //console.log(result)
        if (result.length > 0) {
            res.send(result[0].data)
        } else {
            next();
        }

    })

}
controlers.read = function(req, res) {
    let data = Object.keys(req.body)[0]

    cData.find('jsondata', data).then(result => {

        if (result.length > 0) {
            //console.log(result[0])
            res.send(result)
        } else {
            res.send([{ msg: 'nodata' }])
        }
    })
}
controlers.updata=function(req,res){
    let data = Object.keys(req.body)[0]
    let condtition=JSON.stringify({_id:JSON.parse(data)._id})
    console.log(data)
    console.log(condtition)
   cData.updata('jsondata',condtition,data).then(result=>{
    console.log(result)
   })
}
controlers.pushData = function(req, res) {

    let jdata = JSON.parse(Object.keys(req.body)[0])
    console.log(jdata)

    cData.add('jsondata', jdata).then(result => {
        console.log(result.insertedId.toHexString()) //获取返回的ID
        let resData = { data: result.ops }
        console.log(result.ops)
        res.send(result.ops)


    })


}
controlers.login = function(req, res) {
    let reqData = Object.keys(req.body)[0]
    console.log(reqData)

    cData.find('users', reqData).then(result => {
        //res.end(data.insertedId.toHexString())
        let resjson = {}
        console.log(result)
        if (result.length < 1) {
            resjson = { id: null }

        } else {
            resjson = { id: result[0]._id }

        }
        res.send(resjson)


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


export { controlers }