

class getD{
    
    static getInstance(){
        if(!getD.instance){
            getD.instance =new getD();
        }
        return getD.instance;
    };
    constructor(){
        // set 'postData' is stroed value
       this.postData='';
       //need url object in nodejs 
       this.params='';
    };
     POST(req,res){
        return new Promise((resolve,reject)=>{
               req.setEncoding('utf-8');
               req.on('data',(chunk)=>{
                 this.postData+=chunk;
                
               });
               req.on('end',()=>{
                      if(this.postData){
       
                        resolve(this.postData);
                        return;
                       
                       }else{
                        reject('I can not get data！')
                       }
          });
        });

    }

    GET(req,res){
        return new Promise((resolve,reject)=>{

            this.params=url.parse(req.url,true).query;
            if(this.params){
                resolve(this.params);
                return;
            }else{
                reject('no get any params! ')
            }
        })
    };
    //

}
getD=getD.getInstance();
export {getD};