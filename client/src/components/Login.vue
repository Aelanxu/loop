<template>
    <div id="lgoin">
      <h3>用户登录</h3>
          <input type="text"  v-model="username" placeholder="PLEASE INPUT YOUR ACCONT">
          <br>
          <input type="password" v-model="password" placeholder="PLEASE ENTER YOUR PWD">
          <br>
          <button @click='login()'>登录</button>
          
          

           
    </div>
</template>
<script>
import DataList from './DataList.vue';
import { host, localDate } from "../config.js";

export default {
     data(){

        return{
            username:null,
            password:null
        }
     },
     methods:{
         login(){
            this.axios({
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        method: "post",
        url: `${host}/login`,
        data: {
          userName:this.username,
          pwd: this.password
        }
     
      }).then(response => {
          let userid=response.data.id
        if (userid===null) {
          
          console.log('no')

        }else{
           //this.datalist = JSON.parse(JSON.stringify(response.data));
            this.$router.push(`/DataList/${userid}`)
        }
      });
              
           
         }//
     },//
     
}
</script>
<style lang="css" scoped>

</style>