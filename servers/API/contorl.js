import { cData } from '../data/data.js'
import * as url from 'url'



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
    let data = JSON.parse(Object.keys(req.body)[0])

    let jquery = null
    if (Object.keys(data)[0] === 'userId') {
        jquery = { userId: cData.ObjectId(data.userId) }
    } else {
        console.log(data)
        jquery = { _id: cData.ObjectId(data._id) }
        console.log(jquery)
    }
    cData.find('jsondata', jquery).then(result => {

        if (result.length > 0) {
            //console.log(result[0])
            res.send(result)
        } else {
            res.send([{ msg: 'nodata' }])
        }
    })
}
controlers.update = function(req, res) {
    let data = JSON.parse(Object.keys(req.body)[0])
    let id = cData.ObjectId(data._id)

    cData.update('jsondata', { _id: id }, { apiName: data.apiName, path: data.path, data: data.data, createTime: data.createTime }).then(result => {
        console.log(result.result.ok)
        if (result.result.ok === 1) {
            res.send({ msg: 'success' })
        }
    })

}
controlers.pushData = function(req, res) {

    let jdata = JSON.parse(Object.keys(req.body)[0])
    jdata.userId = cData.ObjectId(jdata.userId)
    console.log(jdata)

    cData.add('jsondata', jdata).then(result => {
        //console.log(result.insertedId.toHexString()) //获取返回的ID
        let resData = { data: result.ops }
        console.log(result.ops)
        res.send(result.ops)


    })


}
controlers.deleteData = function(req, res) {
    let jdata = JSON.parse(Object.keys(req.body)[0])
    let id = cData.ObjectId(jdata._id)
    console.log(jdata)
    cData.dedata('jsondata', { _id: id }).then(result => {
        if (result.result.ok === 1) {
            res.send({ msg: 'success' })
        }
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


export { controlers }