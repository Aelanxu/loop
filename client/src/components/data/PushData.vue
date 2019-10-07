<template>
<div id='pushdata'>
    <div><p>{{apiName}}</p><input type="text" v-model="path"></div>
    <div><textarea v-model="data" rows="3" cols="20"></textarea></div>
</div>
    
</template>
<script>
import { host, localDate } from "../../config.js"
import qs from'Qs'
export default {
    data(){
        return{
          apiName:'',
          path:'',
          data:''
        }
    },
    props:['id'],
    mounted(){
        this.getdata();
    },
    methods:{
       getdata() {
     // let postData={userId:this.userid,apiName:'登录接口', path:'/test/api',data:{n:111,MJ:'WWW',OBJ:{N:'TT'}}}
      let postData={userId:this.id}
      this.axios({
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        method: "post",
        url: `${host}/read`,
        data: JSON.stringify(postData)
      }).then(response => {
         console.log(response);
        if (response.data) {
          let {apiName,path,data}= response.data[0];
          this.apiName=apiName
          this.path=path
          this.data=JSON.stringify(data)
          console.log(this.data);
        }
      });
       }

    }

}
</script>
<style lang="sass" scoped>

</style>