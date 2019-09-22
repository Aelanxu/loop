<template>
    <div id="lgoin">
      <h3>用户登录</h3>
          <input type="text" :v-model="username" placeholder="PLEASE INPUT YOUR ACCONT">
          <br>
          <input type="password" v-model="password" placeholder="PLEASE ENTER YOUR PWD">
          <br>
          <button @click='login()'>登录</button>
          
          

           
    </div>
</template>
<script>
import DataList from './DataList.vue';
export default {
     data(){

        return{
            username:null,
            password:null
        }
     },
     methods:{
         login(){
             this.$router.push('/DataList')
         }
     },
     
}
</script>
<style lang="sass" scoped>

</style>