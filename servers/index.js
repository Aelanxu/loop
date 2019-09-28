import loop from './zero/server.js';

import { login } from './API/contorl.js';
const app = loop();


    // app.get('/foo', function handle1(req, res, next) {
    //     next(new Error('Bang!'))
    // }, function handle2(req, res, next) {
    //     res.end('Will not go here')
    // }, function handle3(err, req, res, next) {
    //     console.log(`Error Caught! Error message is ${err.message}`)
    //     next(err)
    // })

// app.get('/foo', function(req, res, next) {
//     res.end('Will not go here too')
// })

// app.use('/foo', function(req, res, next) {
//     res.end('Will not go here too')
// })

// app.get('/foo', function(err, req, res, next) {
//     console.log(err.name)
//     res.end('Will not go here too')
// })

// app.use('/foo', function(err, req, res, next) {
//     console.log(`Error Caught! Error message is ${err.message}`)
//     res.end('Go here')
// })

app.get('/foo', function(req, res) {  
  // res.end('222')
   res.send('11')
 console.log(res.send)
    


})

app.listen(8888)