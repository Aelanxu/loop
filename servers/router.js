function route(handle,pathname,req,res){
   
    if((typeof handle[pathname]==='function') && (handle.hasOwnProperty(pathname))){
        console.log( handle[pathname])
        return handle[pathname](req,res);

    }else{
        res.writeHead(404,{"Content-Type":"text/plain"});
        res.write('404 Not Found')
    }
       
          
         
         
     
}
export{route};