//封装get/post 的方法用于复用9/18

class getD{
    
    static getInstance(){
        if(!getD.instance){
            getD.instance =new getD();
        }
        return getD.instance;
    };
    constructor(){
  
    };
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
                reject('no get any params! ');
                res.end();
            }
        })
    };
    //

}
getD=getD.getInstance();
export {getD};